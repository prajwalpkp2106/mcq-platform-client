import React from "react";
import "../Contest/Contest.css";

export default function Home() {
  return (
    <div className="h-full flex justify-center absolute top-0 left-0 text-center w-full p-4">
      <div className="h-[80%] bg-black/40 text-center flex flex-col backdrop-blur-sm justify-center w-full m-auto space-y-4 bg-gradient-to-b from-gray-400/20 to-gray-500/20">
        <div>
          <img
            className=" w-80 md:w-[300px] mx-auto"
            src="https://www.pictcsi.com/assets/CSI%20Logo%20Nav.png"
          ></img>
        </div>
        <div className="text-6xl tracking-widest text-white font-extralight">
          MCQ Platform
        </div>
      </div>
    </div>
  );
}
