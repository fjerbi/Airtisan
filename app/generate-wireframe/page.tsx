"use client";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setScript } from "@/store/scriptSlice";
import { RootState } from "@/store/scriptSlice";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "react-loader-spinner";
import { Code2, Camera } from "lucide-react";
import { motion } from "framer-motion";
import CodePreview from "../codePreview/_components/DemoPreview";
import Image from "next/image";

// Define wireframe suggestion type
interface WireframeSuggestion {
  title: string;
  url: string;
}

const wireframeSuggestions: WireframeSuggestion[] = [
  {
    title: "Simple Landing Page",
    url: "https://balsamiq.com/assets/learn/articles/wireframe-example-plain.png",
  },
  {
    title: "E-commerce Product Card",
    url: "https://images.edrawmax.com/examples/wireframe-examples/online-shopping-store-wireframe.jpg",
  },
  {
    title: "Dashboard Layout",
    url: "https://kinsta.com/wp-content/uploads/2021/11/pasted-image-0-6.png",
  },
];

export default function Generate() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [outputFormat, setOutputFormat] = useState<"jsx" | "html">("jsx");
  const script = useSelector((state: RootState) => state.script.script);
  const [editedScript, setEditedScript] = useState<string>(script);
  const dispatch = useDispatch();

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!imageUrl) return;
    setLoading(true);

    try {
      const response = await axios.post("/api/generate-code", {
        imageUrl,
        outputFormat,
      });
      let { script } = response.data as { script: string };
      script = script
        .replace(/^```(jsx|html)/, "")
        .replace(/```$/, "")
        .trim();
      dispatch(setScript(script));
      setEditedScript(script);
    } catch (error: unknown) {
      console.error("Error generating code:", error);
      alert("Failed to generate code. Please check the URL or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWireframeSelect = (url: string): void => {
    setImageUrl(url);
    void handleSubmit();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-teal-600 via-cyan-500 to-indigo-700 p-8 text-white">
      {/* Main Content */}
      <div className="w-full max-w-5xl flex flex-col items-center mb-20">
        {/* Header */}
        <motion.h1
          className="text-4xl sm:text-6xl font-bold mb-12 text-center tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AI Wireframe Code Generator
        </motion.h1>

        {/* Input Section */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-6">
          <Input
            required={true}
            type="text"
            value={imageUrl}
            onChange={handleImageUrlChange}
            placeholder="Enter Wireframe Image URL"
            className="w-full p-3 bg-white/90 text-gray-800 rounded-xl shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all duration-300"
          />

          <div className="flex items-center gap-4">
            <label className="text-cyan-100 font-medium">Output Format:</label>
            <select
              value={outputFormat}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setOutputFormat(e.target.value as "jsx" | "html")
              }
              className="p-2 bg-white/90 text-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              <option value="jsx">JSX + Tailwind CSS</option>
              <option value="html">HTML + CSS</option>
            </select>
          </div>

          <motion.button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {loading ? (
              <>
                <ProgressBar
                  height="24"
                  width="24"
                  ariaLabel="loading"
                  barColor="#ffffff"
                  wrapperStyle={{ display: "inline-block", verticalAlign: "middle" }}
                />
                Generating...
              </>
            ) : (
              <>
                <Code2 size={20} />
                Generate Code
              </>
            )}
          </motion.button>
        </div>

        {/* Loading State */}
        {loading && (
          <motion.div
            className="mt-8 text-cyan-200 font-medium animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.div>
        )}

        {/* Suggestions */}
        {!loading && (
          <div className="mt-12 w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center text-cyan-100">
              Suggested Wireframes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wireframeSuggestions.map((wireframe, index) => (
                <motion.div
                  key={index}
                  className="bg-white/95 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleWireframeSelect(wireframe.url)}
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={wireframe.url}
                      alt={wireframe.title}
                      fill
                      className="object-contain p-2"
                      onError={(e) =>
                        (e.currentTarget.src = "https://via.placeholder.com/150")
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Generated Output with Full-Width CodePreview */}
        {script && !loading && (
          <div className="mt-12 w-full flex flex-col items-center gap-8">
            <motion.div
              className="w-full bg-white/95 rounded-2xl shadow-2xl border border-cyan-200 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-semibold p-4 flex items-center gap-2 text-indigo-700 bg-indigo-50">
                <Camera size={24} />
                Preview & Editor
              </h2>
              <CodePreview
                script={script}
                editedScript={editedScript}
                setEditedScript={setEditedScript}
                outputFormat={outputFormat}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}