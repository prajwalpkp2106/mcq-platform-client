import React from "react";
import "../Contest/Contest.css";

export default function Home() {
  return (
    <div className="h-[80%] bg-slate-200/10 text-center flex flex-col justify-center my-auto space-y-4">
      <div>
        <img
          className=" w-80 md:w-[300px] mx-auto"
          src="https://www.pictcsi.com/assets/CSI%20Logo%20Nav.png"
        ></img>
      </div>
      <div className="text-6xl text-white">MCQ Platform</div>
    </div>
  );
}
