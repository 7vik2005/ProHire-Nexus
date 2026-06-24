"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { job_service, useAppData } from "@/context/AppContext";
import { Application, Job } from "@/type";
import axios from "axios";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Link from "next/link";

const JobPage = () => {
  const { id } = useParams();
  const { user, isAuth, applyJob, applications, btnLoading } = useAppData();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);

  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (applications && id) {
      applications.forEach((item: any) => {
        if (item.job_id.toString() === id) setApplied(true);
      });
    }
  }, [applications, id]);

  const applyJobHandler = (id: number) => {
    applyJob(id);
  };

  const [loading, setLoading] = useState(true);

  async function fetchSingleJob() {
    try {
      const { data } = await axios.get(`${job_service}/api/job/${id}`);
      setJob(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSingleJob();
  }, [id]);

  const [jobApplications, setJobApplications] = useState<Application[]>([]);

  async function fetchJobApplications() {
    try {
      const currentToken = Cookies.get("token");
      const { data } = await axios.get(
        `${job_service}/api/job/application/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      setJobApplications(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user && job && user.user_id === job.posted_by_recuriter_id) {
      fetchJobApplications();
    }
  }, [user, job]);

  const [filterStatus, setFilterStatus] = useState("All");

  const filteredApplications =
    filterStatus === "All"
      ? jobApplications
      : jobApplications.filter((app) => app.status === filterStatus);

  const [value, setValue] = useState("");

  const updateApplicationHandler = async (id: number) => {
    if (value === "") return toast.error("Please select a valid status");

    try {
      const currentToken = Cookies.get("token");
      const { data } = await axios.put(
        `${job_service}/api/job/application/update/${id}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      toast.success(data.message);
      fetchJobApplications();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {loading ? (
        <Loading />
      ) : (
        <>
          {job && (
            <div className="max-w-5xl mx-auto px-4 py-12">
              <Button
                className="mb-8 gap-2 neo-btn neo-btn-hover bg-white hover:bg-zinc-100 text-black border-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                onClick={() => router.back()}
              >
                <ArrowLeft size={18} /> Back to jobs
              </Button>

              <Card className="overflow-hidden neo-card rounded-none mb-8 dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)]">
                <div className="bg-amber-300 dark:bg-amber-500 p-8 border-b-3 border-black text-black">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1 border-2 border-black font-extrabold uppercase text-xs ${
                            job.is_active
                              ? "bg-emerald-300"
                              : "bg-rose-400"
                          }`}
                        >
                          {job.is_active ? "Open" : "Closed"}
                        </span>
                      </div>

                      <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight">
                        {job.title}
                      </h1>
                      <div className="flex items-center gap-2 text-base font-bold opacity-90 mb-2">
                        <Building2 size={18} />
                        <span>{job.company_name}</span>
                      </div>
                    </div>

                    {user && user.role === "jobseeker" && (
                      <div className="shrink-0">
                        {applied ? (
                          <>
                            <div className="flex items-center gap-2 px-6 py-3 border-3 border-black bg-emerald-300 text-black font-black uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              <CheckCircle2 size={20} />
                              Already Applied
                            </div>
                          </>
                        ) : (
                          <>
                            {job.is_active && (
                              <Button
                                onClick={() => applyJobHandler(job.job_id)}
                                disabled={btnLoading}
                                className="gap-2 h-14 px-8 neo-btn neo-btn-hover bg-rose-400 hover:bg-rose-500 text-black border-3 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                              >
                                <Briefcase size={18} />{" "}
                                {btnLoading ? "Applying..." : "Easy Apply"}
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* details */}
                <div className="p-8">
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center gap-3 p-4 border-3 border-black dark:border-zinc-100 bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none">
                      <div className="h-12 w-12 border-2 border-black bg-cyan-200 flex items-center justify-center shrink-0 rounded-none text-black">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                          Location
                        </p>
                        <p className="font-extrabold uppercase text-sm">{job.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 border-3 border-black dark:border-zinc-100 bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none">
                      <div className="h-12 w-12 border-2 border-black bg-emerald-200 flex items-center justify-center shrink-0 rounded-none text-black">
                        <DollarSign size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                          Salary
                        </p>
                        <p className="font-extrabold uppercase text-sm">₹{job.salary} P.A</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 border-3 border-black dark:border-zinc-100 bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none">
                      <div className="h-12 w-12 border-2 border-black bg-amber-200 flex items-center justify-center shrink-0 rounded-none text-black">
                        <Users size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                          Openings
                        </p>
                        <p className="font-extrabold uppercase text-sm">{job.openings} positions</p>
                      </div>
                    </div>
                  </div>

                  {/* Job description */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                      <Briefcase size={24} className="text-rose-500" />
                      Job Description
                    </h2>

                    <div className="p-6 border-3 border-black dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none">
                      <p className="text-base font-semibold leading-relaxed whitespace-pre-line text-foreground/90">
                        {job.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </>
      )}

      {user && job && user.user_id === job.posted_by_recuriter_id && (
        <div className="w-[90%] md:w-2/3 container mx-auto mt-8 mb-16">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-3xl font-black uppercase tracking-tight">All Applications</h2>
            <div className="flex items-center gap-3">
              <label htmlFor="filter-status" className="text-sm font-bold uppercase tracking-wide opacity-80">
                Filter:
              </label>
              <select
                id="filter-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus:outline-none rounded-none font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900"
              >
                <option value="All" className="bg-background text-foreground dark:bg-zinc-900">All Status</option>
                <option value="Submitted" className="bg-background text-foreground dark:bg-zinc-900">Submitted</option>
                <option value="Hired" className="bg-background text-foreground dark:bg-zinc-900">Hired</option>
                <option value="Rejected" className="bg-background text-foreground dark:bg-zinc-900">Rejected</option>
              </select>
            </div>
          </div>

          {jobApplications && jobApplications.length > 0 ? (
            <>
              <div className="space-y-6">
                {filteredApplications.map((e) => (
                  <div
                    className="p-6 border-3 border-black dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none"
                    key={e.application_id}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 border-2 border-black font-extrabold uppercase text-xs ${
                          e.status === "Hired"
                            ? "bg-emerald-300 text-black"
                            : e.status === "Rejected"
                            ? "bg-rose-400 text-black"
                            : "bg-amber-300 text-black"
                        }`}
                      >
                        {e.status}
                      </span>
                    </div>

                    <div className="flex gap-3 mb-4">
                      <Link
                        target="_blank"
                        href={e.resume}
                        className="inline-block px-3 py-1.5 border-2 border-black bg-cyan-200 text-black font-extrabold uppercase text-xs hover:bg-cyan-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        View Resume
                      </Link>

                      <Link
                        target="_blank"
                        href={`/account/${e.applicant_id}`}
                        className="inline-block px-3 py-1.5 border-2 border-black bg-rose-300 text-black font-extrabold uppercase text-xs hover:bg-rose-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        View Profile
                      </Link>
                    </div>

                    {/* update Status */}
                    <div className="flex gap-2 pt-4 border-t-2 border-black dark:border-zinc-100">
                      <select
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="flex-1 p-2 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus:outline-none rounded-none font-bold dark:bg-zinc-900"
                      >
                        <option value="" className="bg-background text-foreground dark:bg-zinc-900">Update status</option>
                        <option value="Submitted" className="bg-background text-foreground dark:bg-zinc-900">Submitted</option>
                        <option value="Hired" className="bg-background text-foreground dark:bg-zinc-900">Hired</option>
                        <option value="Rejected" className="bg-background text-foreground dark:bg-zinc-900">Rejected</option>
                      </select>
                      <Button
                        disabled={btnLoading}
                        onClick={() =>
                          updateApplicationHandler(e.application_id)
                        }
                        className="neo-btn neo-btn-hover bg-amber-300 hover:bg-amber-400 text-black rounded-none border-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-5 h-10"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredApplications.length === 0 && (
                <p className="text-center py-8 opacity-70 font-bold">
                  No applications with status &quot;{filterStatus}&quot;
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-center py-8 opacity-70 font-bold">No applications yet.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default JobPage;
