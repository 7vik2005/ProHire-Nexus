import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Image */}
          <div className="flex justify-center mb-10">
            <img
              src="/about.jpg"
              className="w-full max-w-[280px] border-4 border-black dark:border-zinc-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] rounded-none"
              alt="About ProHire Nexus"
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground">
              Our Mission At ProHire{" "}
              <span className="text-rose-500">Nexus</span>
            </h1>

            <p
              className="text-lg md:text-xl font-semibold opacity-95 max-w-3xl mx-auto leading-relaxed text-foreground bg-zinc-50 dark:bg-zinc-900 border-3 border-black dark:border-zinc-100 p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] rounded-none"
            >
              At ProHire Nexus, we&apos;re dedicated to revolutionizing the job search
              experience. Our mission is to create meaningful connections
              between talented individuals and forward-thinking companies,
              fostering growth and success for both. No cap, we vibe check every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-amber-300 dark:bg-amber-500 border-t-4 border-black text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
              Ready to find your dream job?
            </h2>
            <p className="text-lg md:text-xl font-bold text-black/90">
              Join thousands of successful job seekers on ProHire Nexus
            </p>
            <div className="pt-4">
              <Link href="/jobs">
                <Button size="lg" className="gap-2 h-14 px-8 text-base neo-btn neo-btn-hover bg-rose-400 hover:bg-rose-500 text-black border-3 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Get Started
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
