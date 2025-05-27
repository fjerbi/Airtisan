"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  FileText,
  ChevronRight,
  LayoutPanelTop,
  Code,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function FeatureShowcase() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      title: "Wireframe to Code Generator",
      description:
        "Transform your wireframes into clean, functional code (JSX + Tailwind CSS or HTML + CSS) with AI-powered precision. Perfect for rapid prototyping and development.",
      icon: <Code2 className="text-indigo-600" size={40} />,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Report Assistant",
      description:
        "Analyze and enhance your reports with AI-driven suggestions and a fully revised report. Streamline your documentation process with ease.",
      icon: <FileText className="text-teal-600" size={40} />,
      color: "from-teal-500 to-cyan-600",
    },
    {
      title: "Diagram Generator",
      description:
        "Generate beautiful and informative diagrams using AI. Enhance your project documentation with visual representations.",
      icon: <LayoutPanelTop className="text-teal-600" size={40} />,
      color: "from-teal-500 to-cyan-600",
    },
    {
      title: "Code Generator",
      description:
        "Generate clean, functional code with AI-powered precision. Perfect for rapid prototyping and development.",
      icon: <Code className="text-teal-600" size={40} />,
      color: "from-teal-500 to-cyan-600",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-teal-100 p-8 text-gray-800">
      {/* Main Content with Margin Bottom */}
      <div className="w-full max-w-5xl flex flex-col items-center mb-20">
        {/* Header */}
        <motion.header
          className="w-full mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 drop-shadow-lg">
          <span className="text-teal-600">AI</span>
          <span className="text-black">rtisan</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-medium max-w-3xl mx-auto">
            Unlock the power of AI to streamline your workflow with these
            innovative tools.
          </p>
        </motion.header>

        {/* Features Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`relative p-6 bg-white/80 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 bg-gradient-to-r ${feature.color}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-4 mb-4">
                {feature.icon}
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  {feature.title}
                </h2>
              </div>
              <p className="text-gray-100 text-base leading-relaxed mb-6">
                {feature.description}
              </p>
              <motion.div
                className="flex items-center gap-2 text-white font-medium hover:text-gray-200 transition-colors duration-300 cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <span>Learn More</span>
                <ChevronRight size={20} />
              </motion.div>
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-2xl"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Developer Section */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.9 }}
        className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg text-center w-full sm:w-1/2 mb-20"
      >
        <Link href="https://fjerbi.github.io/">
          <Image
            src="/firasjerbiv2.png"
            alt="Developer"
            className="w-32 h-32 rounded-full mx-auto mb-4"
            height={200}
            width={200}
          />
        </Link>
        <h2 className="text-2xl font-bold text-white mb-2">
          Developed by Firas Jerbi
        </h2>

        {/* Buy me a coffee section */}
        <a
          className="flex items-center justify-center bg-yellow-500 text-black py-2 rounded-lg shadow-lg mt-6 hover:bg-orange-700 transition duration-300"
          target="_blank"
          href="https://www.buymeacoffee.com/firasjerbi"
        >
          <Image
            className="mr-3"
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
            height={20}
            width={20}
          />
          <span className="font-semibold">Buy me a coffee</span>
        </a>

        {/* Contribute Section */}
        <p className="text-gray-200 mb-4 mt-6">
          Interested in contributing to this project? Contact me via{" "}
          <a
            href="mailto:firas.jerbi.engineer@gmail.com" // Replace with your actual email
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-teal-400 underline transition-colors duration-200"
          >
            email
          </a>{" "}
          or{" "}
          <a
            href="https://www.linkedin.com/in/firas-jerbi-1742b7164" // Replace with your actual LinkedIn
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-teal-400 underline transition-colors duration-200"
          >
            LinkedIn
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}

export default FeatureShowcase;
