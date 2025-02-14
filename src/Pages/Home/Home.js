import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Home() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const cardRef = useRef(null);
  const [token,settoken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("xenia-mcq");
    settoken(token);
  }, [token])


  useEffect(() => {
    // Initial animations
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );
    
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        delay: 1.3, 
        ease: "elastic.out(1, 0.75)"
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Main content */}
      <div 
        ref={cardRef}
        className="relative w-11/12 max-w-4xl mx-auto text-center space-y-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl p-12"
      >
        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text"
        >
          Xenia's MCQ Platform
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Join for Campus to Corporate, Goblet of Debuggers and Fandom
          (Join from Laptop or Desktop)
        </p>

        <button
          ref={buttonRef}
          className="group relative px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl 
                     shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-600/40 
                     transform hover:scale-105 transition-all duration-300 ease-out"
        >
          <a href={token ? "/contests" : "/login"}>
          <span className="relative z-10">Lets Go</span>
          </a>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-0 
                          group-hover:opacity-100 blur-xl transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
}