"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppData } from "@/context/AppContext";
import { AccountProps } from "@/type";
import { Award, Plus, Sparkle, X } from "lucide-react";
import React, { useState } from "react";

const Skills: React.FC<AccountProps> = ({ user, isYourAccount }) => {
  const { addSkill, btnLoading, removeSkill } = useAppData();
  const [skill, setSkill] = useState("");

  const addSkillHandler = () => {
    if (!skill.trim()) {
      alert("Please enter a skill");
      return;
    }
    addSkill(skill, setSkill);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSkillHandler();
    }
  };

  const removeSkillHandler = (skillToRemove: string) => {
    if (confirm(`Are you sure you want to remove ${skillToRemove} ?`)) {
      removeSkill(skillToRemove);
    }
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Card className="neo-card rounded-none dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] bg-background overflow-hidden">
        <div className="bg-amber-300 dark:bg-amber-500 p-6 border-b-3 border-black text-black">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 border-2 border-black bg-white flex items-center justify-center">
              <Award size={20} className="text-black" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black uppercase text-black">
                {isYourAccount ? "Your Skills" : "User Skills"}
              </CardTitle>
              {isYourAccount && (
                <CardDescription className="text-sm mt-1 text-black font-semibold">
                  Showcase your expertise and abilities
                </CardDescription>
              )}
            </div>
          </div>
        </div>

        {/* Skills Display */}
        <CardContent className="p-6 space-y-6">
          {/* Add Skills Input */}
          {isYourAccount && (
            <div className="flex gap-3 flex-col sm:flex-row mb-2">
              <div className="relative flex-1">
                <Sparkle
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70 text-foreground"
                />
                <Input
                  type="text"
                  placeholder="e.g. React, Node.js, Python..."
                  className="h-12 pl-10 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button
                onClick={addSkillHandler}
                className="h-12 gap-2 px-6 neo-btn neo-btn-hover bg-rose-400 hover:bg-rose-500 text-black border-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                disabled={!skill.trim() || btnLoading}
              >
                <Plus size={18} /> Add Skills
              </Button>
            </div>
          )}
          {user.skills && user.skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {user.skills.map((e, i) => (
                <div
                  className="group relative inline-flex items-center gap-2 border-2 border-black dark:border-zinc-100 bg-cyan-200 text-black font-extrabold text-sm rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] pl-4 pr-3 py-1.5"
                  key={i}
                >
                  <span>{e}</span>

                  {isYourAccount && (
                    <button
                      onClick={() => removeSkillHandler(e)}
                      className="h-6 w-6 border border-black bg-white text-rose-500 flex items-center justify-center transition-all hover:bg-rose-500 hover:text-white rounded-none ml-1 cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 border-3 border-black dark:border-zinc-100 bg-white dark:bg-zinc-800 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)] rounded-none">
                  <Award size={32} className="text-black dark:text-zinc-100" />
                </div>
                <CardDescription className="text-base font-bold text-foreground">
                  {isYourAccount
                    ? "No skills added yet. Start building your profile!"
                    : "No skills added by user"}
                </CardDescription>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Skills;
