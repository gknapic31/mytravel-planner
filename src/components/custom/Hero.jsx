import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plane, Compass, MapPin, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

function Hero() {
  const [animateElements, setAnimateElements] = useState(false);

  useEffect(() => {
    // Trigga animaciju nakon mounta
    setTimeout(() => setAnimateElements(true), 300);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 animate-pulse"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-white/20 animate-bounce">
        <Plane size={60} />
      </div>
      <div className="absolute bottom-20 right-10 text-white/20 animate-pulse">
        <Compass size={80} />
      </div>
      <div
        className="absolute top-40 right-20 text-white/20 animate-spin"
        style={{ animationDuration: "20s" }}
      >
        <MapPin size={40} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <div
          className={`transform transition-all duration-1000 ${
            animateElements
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              What’s Your Next
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Destination?
            </span>
          </h1>

          <p className="text-2xl text-white/90 mb-4 font-light">
            Plan less, travel more.
          </p>

          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            Turn ideas into adventures with your personal trip planner.
          </p>

          {/* Gradient Button using shadcn/ui */}
          <Link to={"/create-trip"}>
            <Button variant="gradient">
              Plan your trip now
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                size={24}
              />
            </Button>
          </Link>

        </div>
      </div>
    </section>
  );
}

export default Hero;
