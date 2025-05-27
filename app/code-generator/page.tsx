import Image from "next/image";
import React from "react";

function CodeGenerator() {
  return (
    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-teal-600 via-cyan-500 to-indigo-700 min-h-screen text-white">
      <div className="relative flex flex-col items-center">
        <Image
          src="/giphy.gif" // Example GIF URL
          alt="Work in progress GIF"
          width={200}
          height={200}
          className="   object-contain"
        />
       <h1 className="text-2xl font-light text-white">   
        Coming Soon.. </h1> 
      </div>
    </div>
  );
}

export default CodeGenerator;
