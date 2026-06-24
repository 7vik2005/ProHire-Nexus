"use client";
import { useAppData } from "@/context/AppContext";
import { Job } from "@/type";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle,
  DollarSign,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { user, btnLoading, applyJob, applications } = useAppData();

  const applyJobHandler = (id: number) => {
    applyJob(id);
  };

  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (applications && job.job_id) {
      applications.forEach((item: any) => {
        if (item.job_id === job.job_id) setApplied(true);
      });
    }
  }, [applications, job.job_id]);

  return (
    <Card className="w-full max-w-[380px] neo-card neo-card-hover rounded-none group dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(250,250,250,1)] bg-background">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-black mb-2 line-clamp-2 group-hover:text-rose-500 transition-colors uppercase tracking-tight text-foreground">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-sm font-bold opacity-80">
              <Building2 size={16} />
              <span>{job.company_name}</span>
            </div>
          </div>

          <Link href={`/company/${job.company_id}`} className="shrink-0">
            <div className="w-14 h-14 rounded-none border-3 border-black dark:border-zinc-100 overflow-hidden hover:scale-105 transition-transform bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)]">
              <img
                src={job.company_logo}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1.5 px-3 py-1 border-2 border-black dark:border-zinc-100 bg-amber-300 text-black font-extrabold rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <MapPin size={14} className="text-black" />
              <span>{job.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-black uppercase text-foreground bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 border-2 border-black dark:border-zinc-100 w-fit">
            <DollarSign size={16} className="text-emerald-500" />
            <span>₹ {job.salary} P.A</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 pt-4 border-t-3 border-black dark:border-zinc-100">
        <div className="flex w-full gap-2">
          <Link href={`/jobs/${job.job_id}`} className="flex-1">
            <Button className="w-full gap-2 neo-btn neo-btn-hover bg-white hover:bg-zinc-100 text-black rounded-none border-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              View Details{" "}
              <ArrowRight
                size={16}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </Button>
          </Link>

          {user && user.role === "jobseeker" && (
            <>
              {applied ? (
                <div className="flex-1 flex items-center justify-center gap-2 text-black font-extrabold text-sm bg-emerald-300 border-3 border-black rounded-none px-3 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <CheckCircle size={15} />
                  Applied
                </div>
              ) : (
                <>
                  {job.is_active !== false && (
                    <Button
                      disabled={btnLoading}
                      onClick={() => applyJobHandler(job.job_id)}
                      className="flex-1 gap-2 neo-btn neo-btn-hover bg-rose-400 hover:bg-rose-500 text-black rounded-none border-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <Briefcase size={16} />
                      Easy Apply
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {job.is_active === false && (
          <div className="w-full text-center text-sm text-black bg-rose-400 border-3 border-black rounded-none px-3 py-2 font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Position Closed
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;
