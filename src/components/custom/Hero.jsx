import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Blurred background image */}
      <img
        src="/travel.jpg"
        alt="Travel background"
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-125"
      />
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center px-6 gap-8">
        <h1 className="font-extrabold text-[48px] md:text-[64px] text-center mt-10 text-white drop-shadow-lg animate-fade-in-up">
          <span className="text-gradient bg-clip-text text-transparent">
            What’s Your Next Destination?
          </span>
          <br />
          <span className="text-white font-light text-[28px] md:text-[36px]">
            Plan less, travel more.
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 text-center max-w-2xl drop-shadow">
          Turn ideas into adventures with your personal trip planner.
        </p>
        <Link to={"/create-trip"}>
          <Button className="bg-[#303030] text-white text-lg px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 hover:scale-105 transition-transform duration-200">
            Plan your trip now
          </Button>
        </Link>
      </div>
      <style>
        {`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s cubic-bezier(.4,0,.2,1) both;
          }
        `}
      </style>
    </section>
  );
}

export default Hero;
