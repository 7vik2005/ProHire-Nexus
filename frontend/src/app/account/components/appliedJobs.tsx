"use client";
import { Card } from "@/components/ui/card";
import { Application } from "@/type";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface AppliedJobsProps {
  applications: Application[];
}

const AppliedJobs: React.FC<AppliedJobsProps> = ({ applications }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "hired":
        return {
          icon: CheckCircle2,
          color: "text-black font-black uppercase text-xs",
          bg: "bg-emerald-300",
          border: "border-2 border-black dark:border-zinc-100",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-black font-black uppercase text-xs",
          bg: "bg-rose-400",
          border: "border-2 border-black dark:border-zinc-100",
        };
      default:
        return {
          icon: Clock,
          color: "text-black font-black uppercase text-xs",
          bg: "bg-amber-300",
          border: "border-2 border-black dark:border-zinc-100",
        };
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Card className="neo-card rounded-none dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] bg-background overflow-hidden">
        <div className="bg-amber-300 dark:bg-amber-500 text-black p-6 border-b-3 border-black">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 border-2 border-black bg-white flex items-center justify-center">
              <Briefcase size={20} className="text-black" />
            </div>
          </div>
          <h1 className="text-2xl font-black uppercase mt-2">Your Applied Jobs</h1>
          <p className="text-sm font-bold opacity-80 mt-1 uppercase tracking-wide">
            {applications.length} applications submitted
          </p>
        </div>

        <div className="p-6">
          {applications && applications.length > 0 ? (
            <div className="space-y-6">
              {applications.map((a) => {
                const statusConfig = getStatusConfig(a.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={a.application_id}
                    className="p-5 border-3 border-black dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-black uppercase tracking-tight mb-3">
                          {a.job_title}
                        </h3>

                        <div className="flex flex-wrap gap-4 items-center">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1.5 px-3 py-1 border-2 border-black dark:border-zinc-100 bg-cyan-200 text-black font-extrabold rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              <DollarSign size={14} className="text-black" />
                              <span>
                                ₹ {a.job_salary}
                              </span>
                            </div>
                          </div>

                          <div
                            className={`flex items-center gap-1.5 px-3 py-1 border ${statusConfig.bg} ${statusConfig.border} rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                          >
                            <StatusIcon
                              size={14}
                              className="text-black"
                            />
                            <span
                              className={statusConfig.color}
                            >
                              {a.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/jobs/${a.job_id}`}
                        className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 border-2 border-black dark:border-zinc-100 bg-white hover:bg-zinc-100 text-black font-extrabold uppercase text-xs rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)] transition-all"
                      >
                        <Eye size={16} />
                        View Job
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <p className="text-center py-8 font-bold opacity-80 uppercase tracking-wide">No Applications Yet (stay strong, fam)</p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AppliedJobs;
