"use client";
import { CareerGuideResponse } from "@/type";
import axios from "axios";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Lightbulb,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { utils_service } from "@/context/AppContext";
import toast from "react-hot-toast";

const CarrerGuide = () => {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CareerGuideResponse | null>(null);

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSkill();
    }
  };

  const getCarrerGuidance = async () => {
    if (skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${utils_service}/api/utils/career`, {
        skills: skills,
      });

      setResponse(data);
      toast.success("Career guidance generated");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setSkills([]);
    setCurrentSkill("");
    setResponse(null);
    setOpen(false);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white font-bold text-xs uppercase bg-lime-400 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Sparkles size={16} />
          <span>AI-Powered Career Guidance fr</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-4 mb-2">
          Discover Your Career Path
        </h2>
        <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8 font-medium">
          Get personalized job recommendations and learning roadmaps based on
          your skills.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size={"lg"} className="neo-btn neo-btn-hover h-12 px-8 bg-lime-400 hover:bg-lime-500 text-black border-3 border-black gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Sparkles size={18} />
              Get Career Guidance
              <ArrowRight size={18} />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto neo-card border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] p-8">
            {!response ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                    <Sparkles className="text-lime-500" />
                    Tell us about your skills
                  </DialogTitle>
                  <DialogDescription className="text-sm font-bold opacity-70 uppercase tracking-wider">
                    Add your technical skills to receive personalized career
                    recommendations
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill" className="text-xs uppercase font-black tracking-wider">Add Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        id="skill"
                        placeholder="e.g., React, Node.js, Python..."
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        className="h-11 border-3 border-black dark:border-zinc-700 bg-background text-foreground focus-visible:ring-0 focus-visible:border-red-500 rounded-none font-bold"
                        onKeyPress={handleKeyPress}
                      />
                      <Button onClick={addSkill} className="neo-btn neo-btn-hover h-11 bg-yellow-300 hover:bg-yellow-400 text-black border-3 border-black gap-2 shrink-0">
                        Add
                      </Button>
                    </div>
                  </div>

                  {skills.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs uppercase font-black tracking-wider">Your Skills ({skills.length})</Label>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s) => (
                          <div
                            key={s}
                            className="inline-flex items-center gap-2 pl-3 pr-2 py-1 border-2 border-black bg-yellow-300 text-black font-bold text-xs uppercase rounded-none"
                          >
                            <span className="text-sm font-medium">{s}</span>
                            <button
                              onClick={() => removeSkill(s)}
                              className="h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={getCarrerGuidance}
                    disabled={loading || skills.length === 0}
                    className="neo-btn neo-btn-hover w-full h-11 bg-lime-400 hover:bg-lime-505 text-black border-3 border-black gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Analyzing
                        Your skills...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} /> Generate Career Guidance
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                    <Target className="text-lime-500" />
                    Your Personalized Career Guide
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* summary */}
                  <div className="p-5 neo-card bg-zinc-50 dark:bg-zinc-900 border-3">
                    <div className="flex items-start gap-3">
                      <Lightbulb
                        className="text-yellow-500 mt-1 shrink-0 animate-pulse"
                        size={20}
                      />
                      <div>
                        <h3 className="font-black uppercase tracking-tight mb-2">Career Summary</h3>
                        <p className="text-sm leading-relaxed opacity-90 font-medium">
                          {response.summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* job options */}
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-3 flex items-center gap-2">
                      <Briefcase size={20} className="text-red-500" />
                      Recommended Career Paths
                    </h3>
                    <div className="space-y-3">
                      {response.jobOptions.map((job, index) => (
                        <div
                          className="p-5 neo-card neo-card-hover border-3 bg-background"
                          key={index}
                        >
                          <h4 className="font-semibold text-base mb-2">
                            {job.title}
                          </h4>

                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium opacity-70">
                                Responsibilities:
                              </span>
                              <span className="opacity-80">
                                {job.responsibilities}
                              </span>
                            </div>
                            <span className="font-medium opacity-70">
                              Why this Role:
                            </span>
                            <span className="opacity-80">{job.why}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills to learn */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp size={20} className="text-blue-600" />
                      Skills to Enhance Your Career
                    </h3>
                    <div className="space-y-4">
                      {response.skillsToLearn.map((category, index) => (
                        <div className="space-y-2" key={index}>
                          <h4 className="font-semibold text-sm text-blue-600">
                            {category.category}
                          </h4>
                          <div className="space-y-2">
                            {category.skills.map((skill, sindex) => (
                              <div
                                key={sindex}
                                className="p-3 rounded-lg bg-secondary border text-sm"
                              >
                                <p className="font-medium mb-1">
                                  {skill.title}
                                </p>

                                <p className="text-xs opacity-70 mb-1">
                                  <span className="font-medium">Why: </span>
                                  {skill.why}
                                </p>

                                <p className="text-xs opacity-70 mb-1">
                                  <span className="font-medium">How: </span>
                                  {skill.how}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning approach */}
                  <div className="p-4 rounded-lg border bg-blue-950/20 dark:bg-red-950/20">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <BookOpen size={20} className="text-blue-600" />
                      {response?.learningApproach?.title}
                    </h3>

                    <ul className="space-y-2">
                      {response?.learningApproach?.points?.map(
                        (point, index) => (
                          <li
                            key={index}
                            className="text-sm flex items-start gap-2"
                          >
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span
                              className="opacity-90"
                              dangerouslySetInnerHTML={{ __html: point }}
                            />
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <Button
                    onClick={resetDialog}
                    variant={"outline"}
                    className="w-full"
                  >
                    Start New Analysis
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CarrerGuide;
