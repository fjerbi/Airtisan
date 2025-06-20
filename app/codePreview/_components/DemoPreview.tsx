import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  Sandpack,
} from "@codesandbox/sandpack-react";

const CodePreview = ({ script }: { script: string }) => {
  return (
    <SandpackProvider>
      <Sandpack
        template="react"
        theme="dark"
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          showLineNumbers: true,
          editorHeight: 800, // default - 300
          closableTabs: true,
          resizablePanels: true,
          editorWidthPercentage: 90,
          showTabs: true,
          
        }}
        files={{
          "/App.js":
            script ||
            `export default function App() { return <h1>Generated Code Here</h1>; }`,
          "/index.js": `import React from "react"; import { createRoot } from "react-dom/client"; import App from "./App"; createRoot(document.getElementById("root")).render(<App />);`,
        }}
      />
      <SandpackLayout>
        <SandpackCodeEditor
          style={{  width: "100%" }} // Full width
        />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default CodePreview;
