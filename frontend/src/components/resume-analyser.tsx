"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Loader2,
  ArrowRight,
  FileCheck,
  Zap,
} from "lucide-react";
import axios from "axios";
import { ResumeAnalysisResponse } from "@/type";
import { utils_service } from "@/context/AppContext";
import toast from "react-hot-toast";

const ResumeAnalyzer = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResumeAnalysisResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const analyzeResume = async () => {
    if (!file) {
      toast.error("Please upload a resume");
      return;
    }

    setLoading(true);
    try {
      const base64 = await convertToBase64(file);
      const { data } = await axios.post(
        `${utils_service}/api/utils/resume-analyser`,
        {
          pdfBase64: base64,
        }
      );
      setResponse(data);
      toast.success("Resume analyzed successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to analyze resume");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setFile(null);
    setResponse(null);
    setOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getScoreColor = (score: number) => {
    return "text-black font-extrabold";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-emerald-300";
    if (score >= 60) return "bg-amber-300";
    return "bg-rose-400";
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "high")
      return "bg-rose-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)]";
    if (priority === "medium")
      return "bg-amber-300 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)]";
    return "bg-cyan-300 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)]";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-secondary/30">
      <div className="text-center mb-12">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 border-3 border-black dark:border-zinc-100 bg-rose-300 dark:bg-rose-950/50 mb-6 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)] rounded-none"
        >
          <FileCheck size={16} className="text-black dark:text-rose-400" />
          <span className="text-sm">AI-Powered ATS Analysis (no cap)</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">
          Optimize Your Resume for ATS
        </h2>
        <p className="text-lg opacity-85 max-w-2xl mx-auto mb-8 font-medium">
          Get instant vibe check on your resume&apos;s compatibility with Applicant
          Tracking Systems. Rizz up recruiters.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="neo-btn neo-btn-hover gap-2 h-14 px-8 rounded-none bg-amber-300 text-black border-3 hover:bg-amber-400">
              <FileText size={20} />
              Analyze My Resume
              <ArrowRight size={20} />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto neo-card rounded-none p-6 md:p-8 dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)]">
            {!response ? (
              <>
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-black uppercase flex items-center gap-3">
                    <FileText className="text-rose-500" size={28} />
                    Upload Your Resume
                  </DialogTitle>
                  <DialogDescription className="text-base font-medium opacity-80">
                    Upload your resume in PDF format to get an instant ATS
                    compatibility analysis.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-2">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-3 border-dashed border-black dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center cursor-pointer hover:bg-amber-100 dark:hover:bg-zinc-800/80 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div
                        className="h-16 w-16 border-3 border-black dark:border-zinc-100 bg-amber-300 dark:bg-amber-500 flex items-center justify-center rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(250,250,250,1)]"
                      >
                        <Upload size={32} className="text-black" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">
                          {file ? file.name : "Click to upload your resume"}
                        </p>
                        <p className="text-sm font-medium opacity-70">
                          PDF format only, maximum 5MB
                        </p>
                      </div>
                      {file && (
                        <div className="flex items-center gap-2 text-emerald-600 font-bold">
                          <CheckCircle2 size={18} />
                          <span className="text-sm">
                            Ready to analyze!
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <Button
                    onClick={analyzeResume}
                    disabled={loading || !file}
                    className="w-full h-14 gap-2 neo-btn neo-btn-hover bg-rose-400 hover:bg-rose-500 text-black rounded-none border-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Analyzing Your Resume... (letting AI cook)
                      </>
                    ) : (
                      <>
                        <Zap size={18} />
                        Analyze Resume
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-black uppercase flex items-center gap-3">
                    <FileCheck className="text-emerald-500" size={28} />
                    Your Resume Analysis
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-8 py-2">
                  {/* Overall Score */}
                  <div
                    className={`p-6 border-3 border-black dark:border-zinc-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] ${getScoreBgColor(
                      response.atsScore
                    )} text-black`}
                  >
                    <div className="text-center">
                      <p className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
                        ATS Compatibility Score
                      </p>
                      <div
                        className="text-7xl font-black tracking-tighter"
                      >
                        {response.atsScore}
                      </div>
                      <p className="text-sm font-bold opacity-80 mt-2">out of 100</p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div
                    className="p-5 border-3 border-black dark:border-zinc-100 bg-cyan-100 dark:bg-cyan-900/40 text-black dark:text-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)]"
                  >
                    <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">AI Summary</h3>
                    <p className="text-sm font-semibold leading-relaxed">
                      {response.summary}
                    </p>
                  </div>

                  {/* Score Breakdown */}
                  <div>
                    <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                      <TrendingUp size={24} className="text-rose-500" />
                      Detailed Score Breakdown
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(response.scoreBreakdown).map(
                        ([key, value]) => (
                          <div key={key} className="p-5 border-3 border-black dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)]">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-extrabold uppercase tracking-wide text-sm">{key}</p>
                              <span
                                className={`text-base font-black px-2 py-0.5 border-2 border-black dark:border-zinc-100 ${getScoreBgColor(
                                  value.score
                                )} text-black`}
                              >
                                {value.score}%
                              </span>
                            </div>
                            <div className="w-full bg-white dark:bg-zinc-800 border-2 border-black dark:border-zinc-100 h-4 overflow-hidden mb-2">
                              <div
                                className={`h-full border-r-2 border-black dark:border-zinc-100 ${getScoreBgColor(value.score)}`}
                                style={{ width: `${value.score}%` }}
                              />
                            </div>
                            <p className="text-xs font-semibold opacity-85">
                              {value.feedback}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Strengths */}
                  <div
                    className="p-5 border-3 border-black dark:border-zinc-100 bg-emerald-200 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)]"
                  >
                    <h3 className="font-extrabold text-lg uppercase tracking-wide mb-3 flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-black" />
                      What Your Resume Does Well (Certified W)
                    </h3>
                    <ul className="space-y-2">
                      {response.strengths.map((strength, index) => (
                        <li
                          key={index}
                          className="text-sm font-bold flex items-start gap-2"
                        >
                          <span className="text-black mt-0.5 font-black">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggestions */}
                  <div>
                    <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                      <AlertTriangle size={24} className="text-rose-500" />
                      Recommendations for Improvement (Don&apos;t get Cooked)
                    </h3>
                    <div className="space-y-4">
                      {response.suggestions.map((suggestion, index) => (
                        <div key={index} className="p-5 border-3 border-black dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)]">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <h4 className="font-black text-sm uppercase tracking-wide bg-black text-white dark:bg-white dark:text-black px-2 py-0.5">
                              {suggestion.category}
                            </h4>
                             <span
                              className={`text-xs px-2 py-1 uppercase font-bold border-2 border-black dark:border-zinc-100 ${getPriorityColor(suggestion.priority)}`}
                            >
                              {suggestion.priority} priority
                            </span>
                          </div>
                          <div className="space-y-2 text-sm font-semibold">
                            <div>
                              <span className="font-extrabold opacity-75">
                                Issue:{" "}
                              </span>
                              <span className="opacity-95">
                                {suggestion.issue}
                              </span>
                            </div>
                            <div>
                              <span className="font-extrabold opacity-75">
                                Fix:{" "}
                              </span>
                              <span className="opacity-95 text-rose-600 dark:text-rose-400">
                                {suggestion.recommendation}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={resetDialog}
                    className="w-full h-14 neo-btn neo-btn-hover bg-white hover:bg-zinc-100 text-black rounded-none border-3"
                  >
                    Analyze Another Resume
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

export default ResumeAnalyzer;
