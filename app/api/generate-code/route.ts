import { OpenAI, APIError } from "openai"; // Import APIError

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_TOKEN,
    baseURL: "https://openrouter.ai/api/v1/",
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Your Application',
    },
});

export const config = {
    api: {
        bodyParser: true,
    },
};

interface RequestBody {
    imageUrl: string;
    outputFormat: "jsx" | "html";
}

interface ApiResponse {
    choices: Array<{ message: { content: string } }>;
}

const timeoutPromise = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), ms));

export async function POST(request: Request): Promise<Response> {
    if (request.method !== "POST") {
        return new Response(JSON.stringify({ message: "Method not allowed" }), { status: 405 });
    }

    try {
        const body: RequestBody = await request.json();
        const { imageUrl, outputFormat } = body;

        if (!imageUrl) {
            return new Response(JSON.stringify({ message: "No image URL provided" }), { status: 400 });
        }

        console.log("Processing request with imageUrl:", imageUrl);

        const systemPrompt =
            outputFormat === "jsx"
                ? "You are an AI Coding Assistant that generates UI JSX and Tailwind CSS code based on a given wireframe. Do not include images, replace them with placeholder images. Provide the whole component with all imports."
                : "You are an AI Coding Assistant that generates HTML and CSS code based on a given wireframe. Do not include images, replace them with placeholder images. Provide the whole component with all imports.";

        const timeoutDuration = 60000;
        console.log("Sending request to OpenRouter at:", new Date().toISOString());

        try {
            const apiResponse = await Promise.race([
                openai.chat.completions.create({
                    model: "google/gemini-2.0-flash-exp:free",
                    messages: [
                        { role: "system", content: systemPrompt },
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: `Generate ${outputFormat === "jsx" ? "JSX + Tailwind CSS" : "HTML + CSS"} code for this wireframe.`,
                                },
                                { type: "image_url", image_url: { url: imageUrl } },
                            ],
                        },
                    ],
                    temperature: 0.7,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    n: 1,
                }),
                timeoutPromise(timeoutDuration),
            ]);

            console.log("Response received at:", new Date().toISOString());
            const typedApiResponse = apiResponse as ApiResponse;
            const script = typedApiResponse.choices[0]?.message?.content?.trim() || "No script generated";
            const preview = outputFormat === "jsx" ? `<html><body>${script}</body></html>` : script;

            return new Response(JSON.stringify({ script, preview }), { status: 200 });
        } catch (apiError: APIError | unknown) {
            console.error("API specific error:", apiError);

            if (apiError instanceof APIError && apiError.status === 404) {
                return new Response(
                    JSON.stringify({
                        message: "OpenRouter API error: No endpoints found matching your data policy",
                        details: "Please enable prompt training in your OpenRouter settings: https://openrouter.ai/settings/privacy",
                        error: apiError.message,
                    }),
                    { status: 500 }
                );
            }

            throw apiError; // Re-throw to be caught by the outer catch block
        }
    } catch (error: unknown) {
        console.error("Error in API call:", error);
        if (error instanceof Error) {
            if (error.message === "Request timed out") {
                return new Response(
                    JSON.stringify({ message: "Request timed out. Please try again." }),
                    { status: 504 }
                );
            }
            return new Response(
                JSON.stringify({ message: "Error generating code", error: error.toString() }),
                { status: 500 }
            );
        }
        return new Response(JSON.stringify({ message: "Unknown error occurred" }), { status: 500 });
    }
}