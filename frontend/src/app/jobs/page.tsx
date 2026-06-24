"use client";
import { Job } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { job_service } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Briefcase, Filter, MapPin, Search, X } from "lucide-react";
import Loading from "@/components/loading";
import JobCard from "@/components/job-card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const locations: string[] = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Chennai",
  "Remote",
];

const JobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const ref = useRef<HTMLButtonElement>(null);

  async function fetchJobs() {
    setLoading(true);
    try {
      const currentToken = Cookies.get("token");
      const { data } = await axios.get(
        `${job_service}/api/job/all?title=${title}&location=${location}`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      setJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, [title, location]);

  const clickEvent = () => {
    ref.current?.click();
  };

  const clearFilter = () => {
    setTitle("");
    setLocation("");
    fetchJobs();
    ref.current?.click();
  };

  const hasActiveFilters = title || location;
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase mb-3 tracking-tight">
                Explore <span className="text-rose-500">Opportunities</span>
              </h1>
              <p className="text-sm font-bold opacity-90 uppercase tracking-wide bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 border-2 border-black dark:border-zinc-100 w-fit">
                {jobs.length} jobs active (no cap)
              </p>
            </div>

            <Button className="gap-2 h-12 neo-btn neo-btn-hover bg-amber-300 text-black border-3 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={clickEvent}>
              <Filter size={18} /> Filters
              {hasActiveFilters && (
                <span className="ml-1 px-2 py-0.5 border border-black bg-rose-400 text-black text-xs font-black uppercase">
                  Active
                </span>
              )}
            </Button>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <span className="text-sm font-extrabold uppercase opacity-80">Active Filters:</span>
              {title && (
                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-black dark:border-zinc-100 bg-cyan-200 text-black text-sm font-extrabold rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Search size={14} />
                  {title}
                  <button
                    onClick={() => setTitle("")}
                    className="hover:bg-cyan-300 rounded-none p-0.5 ml-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {location && (
                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-black dark:border-zinc-100 bg-amber-200 text-black text-sm font-extrabold rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <MapPin size={14} />
                  {location}
                  <button
                    onClick={() => setLocation("")}
                    className="hover:bg-amber-300 rounded-none p-0.5 ml-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

          {loading ? (
            <Loading />
          ) : (
            <>
              {jobs && jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {jobs.map((job) => (
                    <JobCard job={job} key={job.job_id} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 neo-card bg-rose-100 dark:bg-rose-950/40 rounded-none border-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 border-3 border-black dark:border-zinc-100 bg-white dark:bg-zinc-800 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)] rounded-none">
                    <Briefcase size={40} className="text-black dark:text-zinc-100" />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-2">No jobs found</h3>
                  <p className="font-semibold text-sm opacity-80">Try adjusting your filters, fam.</p>
                </div>
              )}
            </>
          )}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button ref={ref} className="hidden"></Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] neo-card rounded-none p-6 md:p-8 dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)]">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl font-black uppercase flex items-center gap-2">
                <Filter className="text-rose-500" size={28} />
                Filter Jobs
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-2">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                >
                  <Search size={16} />
                  Search by job title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter job title"
                  className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                >
                  <MapPin size={16} />
                  Location
                </Label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-12 px-3 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus:outline-none focus:ring-0 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold dark:bg-zinc-900"
                >
                  <option value="" className="bg-background text-foreground dark:bg-zinc-900">All Locations</option>
                  {locations.map((e) => (
                    <option value={e} key={e} className="bg-background text-foreground dark:bg-zinc-900">
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <DialogFooter className="mt-8">
              <Button
                onClick={clearFilter}
                className="w-full h-12 neo-btn neo-btn-hover bg-rose-400 hover:bg-rose-500 text-black rounded-none border-3"
              >
                Clear All Filters
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default JobsPage;
