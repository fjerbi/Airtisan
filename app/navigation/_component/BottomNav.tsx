"use client";
import Link from "next/link";
import React from "react";
import { Code, FileImage, Home, LayoutPanelTop, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

function BottomNav() {
  const navItems = [
    {
      href: "/",
      icon: <Home size={28} />,
      hoverColor: "group-hover:text-blue-500",
      label: "Home",
      tooltip: "Back to Home",
    },
    {
      href: "/generate-wireframe",
      icon: <FileImage size={28} />,
      hoverColor: "group-hover:text-yellow-500",
      label: "Wireframes",
      tooltip: "Wireframe to Code",
    },
    {
      href: "/",
      icon: <Code size={28} />,
      hoverColor: "group-hover:text-purple-500",
      label: "Code",
      tooltip: "Code Generator",
    },
    {
      href: "/",
      icon: <LayoutPanelTop size={28} />,
      hoverColor: "group-hover:text-teal-500",
      label: "Diagrams",
      tooltip: "Diagram Generator",
    },
    {
      href: "/",
      icon: <FileCheck size={28} />,
      hoverColor: "group-hover:text-indigo-500",
      label: "Reports",
      tooltip: "Report Assistant",
    },
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 z-50 w-full bg-gradient-to-r from-gray-800/95 via-gray-900/95 to-teal-900/95 border-t border-teal-400/20 shadow-2xl rounded-t-3xl overflow-hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      <div className="grid grid-cols-5 items-center h-20 px-4 sm:px-6 md:px-8 gap-1 relative">
        {navItems.map(({ href, icon, hoverColor, label, tooltip }, index) => (
          <Link key={index} href={href} passHref>
            <motion.div
              className="relative flex flex-col items-center justify-center space-y-1 group transition-all duration-300 hover:bg-teal-700/10 rounded-full p-2"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Icon */}
              <div
                className={`text-white ${hoverColor} transition-colors duration-200`}
              >
                {icon}
              </div>
              {/* Label */}
              <span className="text-xs font-medium text-white group-hover:text-gray-100">
                {label}
              </span>
              {/* Tooltip */}
              <motion.span
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                {tooltip}
              </motion.span>
              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 bg-teal-400/30 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1.5, opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>
        ))}
        {/* Subtle Dividers */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-teal-400/10 transform -translate-y-1/2"></div>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-teal-400/10"
              style={{ left: `${(i + 1) * 20}%` }}
            />
          ))}
      </div>
    </motion.div>
  );
}

export default BottomNav;