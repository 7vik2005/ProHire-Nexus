"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquare, Flame, Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const [rizzScore, setRizzScore] = useState(50);

  // Determine vibes based on rizz slider score
  const getVibeStatus = (score: number) => {
    if (score <= 30) {
      return {
        emoji: "💀",
        title: "ur cooked, fr",
        desc: "recruiters are ghosting, resume is giving main-character-death vibes. let's fix it no cap.",
        color: "bg-red-500 text-white",
        badge: "Status: Cooked",
      };
    } else if (score <= 70) {
      return {
        emoji: "😐",
        title: "mid vibes, ngl",
        desc: "not terrible, but not cookin' either. needs more spice, more projects, more skills.",
        color: "bg-amber-400 text-black",
        badge: "Status: Mid",
      };
    } else {
      return {
        emoji: "😎",
        title: "certified rizzlord",
        desc: "absolute main character energy. offer letters incoming, recruiters crying tears of joy.",
        color: "bg-green-500 text-white",
        badge: "Status: Cooking",
      };
    }
  };

  const currentVibe = getVibeStatus(rizzScore);

  const mockTexts = [
    "Recruiter: u got the job fr",
    "Me: bet",
    "System: Offer letter: $150k + unlimited boba",
    "Recruiter: we loved the resume vibe check",
    "Me: no cap?",
    "Recruiter: no cap.",
    "System: Main character mode enabled",
    "Recruiter: can you start tomorrow?",
    "Me: let me cook",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden selection:bg-yellow-300 selection:text-black">
      
      {/* Mock Recruiter Chat Marquee */}
      <div className="w-full bg-zinc-950 text-white py-3 border-b-4 border-black overflow-hidden relative z-10">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Repeat text twice for infinite seamless scroll */}
          {[...mockTexts, ...mockTexts, ...mockTexts].map((text, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center mx-8 text-sm font-bold tracking-wider ${
                text.includes("Recruiter")
                  ? "text-green-400"
                  : text.includes("System")
                  ? "text-yellow-400"
                  : "text-white"
              }`}
            >
              <MessageSquare size={14} className="mr-2 inline" />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col items-center text-center space-y-16">
        
        {/* Title / Hero */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 border-3 border-black dark:border-white neo-card text-xs font-bold uppercase tracking-wider bg-yellow-300 text-black">
            <Flame size={14} className="animate-bounce" />
            Vibe-check your career
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none text-balance">
            rizz up your <span className="underline decoration-red-500 decoration-8 underline-offset-4">resume</span>. <br />
            get hired. <span className="bg-red-500 text-white px-3 inline-block -rotate-1 transform animate-pulse">fr fr.</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-semibold opacity-85 max-w-3xl mx-auto leading-relaxed">
            stop sending boring PDFs. let AI check your career vibes, manifest custom roadmaps, and secure that bag.
          </p>
        </div>

        {/* Out of the Box: Interactive Resume Rizz/Vibe Meter Slider */}
        <div className="w-full max-w-xl">
          <div className="neo-card p-6 md:p-8 space-y-6 bg-zinc-50 dark:bg-zinc-900 text-left">
            <div className="flex justify-between items-center border-b-2 border-black dark:border-zinc-700 pb-4">
              <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                🎮 Vibe Check Slider
              </h3>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold border-2 border-black text-black ${currentVibe.color.split(" ")[0]}`}>
                {currentVibe.badge}
              </span>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold block">
                Drag slider to measure your job-hunting energy:
              </label>
              
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rizzScore}
                  onChange={(e) => setRizzScore(Number(e.target.value))}
                  className="w-full h-4 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
                />
                <span className="text-3xl font-black shrink-0 w-16 text-center bg-black dark:bg-white text-background px-2 py-1 border-2 border-black">
                  {rizzScore}%
                </span>
              </div>
            </div>

            {/* Dynamic Card Area based on slider state */}
            <div className={`p-5 border-3 border-black dark:border-white transition-all duration-300 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] ${currentVibe.color}`}>
              <div className="flex gap-4 items-start">
                <span className="text-5xl shrink-0 leading-none">{currentVibe.emoji}</span>
                <div className="space-y-1">
                  <h4 className="text-xl font-black capitalize">{currentVibe.title}</h4>
                  <p className="text-sm opacity-90 leading-snug">{currentVibe.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Link href="/home">
            <Button
              size="lg"
              className="neo-btn neo-btn-hover h-16 px-10 text-xl md:text-2xl bg-yellow-300 hover:bg-yellow-400 text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              Rizz my career ⚡
              <ArrowRight size={24} className="ml-2 animate-bounce" />
            </Button>
          </Link>
        </div>

        {/* Feature Grid - Neo Brutalist Layout */}
        <div className="w-full space-y-8 pt-8">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
            what we cookin' in this nexus?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="neo-card neo-card-hover p-6 md:p-8 space-y-4 bg-orange-400 text-black">
              <div className="w-12 h-12 bg-white text-black rounded-full border-3 border-black flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">
                Vibe Checker 📝
              </h3>
              <p className="font-semibold text-sm leading-relaxed">
                upload your resume. our AI screens it, gives raw honest feedback, and highlights skill gaps. no filter.
              </p>
            </div>

            {/* Card 2 */}
            <div className="neo-card neo-card-hover p-6 md:p-8 space-y-4 bg-yellow-300 text-black">
              <div className="w-12 h-12 bg-white text-black rounded-full border-3 border-black flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">
                Upskill Roadmap 🔮
              </h3>
              <p className="font-semibold text-sm leading-relaxed">
                enter your current skills. our AI cooks up a personalized learning guide and career direction. fr fr.
              </p>
            </div>

            {/* Card 3 */}
            <div className="neo-card neo-card-hover p-6 md:p-8 space-y-4 bg-lime-400 text-black">
              <div className="w-12 h-12 bg-white text-black rounded-full border-3 border-black flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">
                1-Click Apply 🚀
              </h3>
              <p className="font-semibold text-sm leading-relaxed">
                browse real openings, submit applications in one tap, and track recruiter responses live. zero friction.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="w-full bg-zinc-950 text-white py-6 border-t-4 border-black text-center text-sm font-bold">
        prohire nexus © 2026 • built for the absolute rizzlers • no cap
      </footer>

    </div>
  );
};

export default LandingPage;
