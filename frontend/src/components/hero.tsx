import { ArrowRight, Briefcase, Search, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b-4 border-black dark:border-zinc-800 py-12 md:py-16 bg-background">
      <div className="container mx-auto px-5 relative">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            {/* badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-zinc-100 font-black text-xs uppercase bg-red-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)]">
              <TrendingUp size={16} />
              <span>#1 Job Platform in India fr fr</span>
            </div>

            {/* main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight uppercase">
              find your dream job at{" "}
              <span className="inline-block bg-yellow-300 text-black border-3 border-black px-2 -rotate-1 py-1">
                ProHire <span className="text-red-600">Nexus</span>
              </span>
            </h1>

            {/* description */}
            <p className="text-lg md:text-xl font-medium opacity-90 leading-relaxed max-w-2xl">
              connect with top employers & discover absolute goldmine opportunities. we help you secure that bag without the stress, fr.
            </p>

            {/* stats */}
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="neo-card p-4 text-center bg-lime-400 text-black">
                <p className="text-2xl md:text-3xl font-black">10k+</p>
                <p className="text-[10px] md:text-xs uppercase tracking-wider font-bold">active jobs fr</p>
              </div>
              <div className="neo-card p-4 text-center bg-orange-400 text-black">
                <p className="text-2xl md:text-3xl font-black">5k+</p>
                <p className="text-[10px] md:text-xs uppercase tracking-wider font-bold">companies cookin'</p>
              </div>
              <div className="neo-card p-4 text-center bg-yellow-300 text-black">
                <p className="text-2xl md:text-3xl font-black">50k+</p>
                <p className="text-[10px] md:text-xs uppercase tracking-wider font-bold">rizzlers hired</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full">
              <Link href={"/jobs"} className="w-full sm:w-auto">
                <Button
                  size={"lg"}
                  className="neo-btn neo-btn-hover text-base px-8 h-12 gap-2 bg-yellow-300 hover:bg-yellow-400 text-black border-3 border-black w-full"
                >
                  <Search size={18} />
                  Browse Jobs{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href={"/about"} className="w-full sm:w-auto">
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="neo-btn neo-btn-hover text-base px-8 h-12 gap-2 bg-background border-3 border-black w-full"
                >
                  <Briefcase size={18} />
                  Learn More
                </Button>
              </Link>
            </div>

            {/* trust indicator section */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase opacity-80 pt-4">
              <span>✔️ Free to use</span>
              <span>•</span>
              <span>✔️ Verified employers</span>
              <span>•</span>
              <span>✔️ Secure platform</span>
            </div>
          </div>

          {/* image section */}
          <div className="flex-1 relative w-full max-w-md md:max-w-none">
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-black dark:border-white">
                <img
                  src="/hero.jpeg"
                  className="object-cover object-center w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
