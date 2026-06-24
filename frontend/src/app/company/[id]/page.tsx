"use client";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { job_service, useAppData } from "@/context/AppContext";
import { Company, Job } from "@/type";
import axios from "axios";
import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Globe,
  Laptop,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CompanyPage = () => {
  const { id } = useParams();

  const { user, isAuth } = useAppData();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);

  async function fetchCompany() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${job_service}/api/job/company/${id}`);
      setCompany(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const isRecruiterOwner =
    user && company && user.user_id === company.recruiter_id;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdatedModalOpen, setIsUpdatedModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [role, setrole] = useState("");
  const [salary, setsalary] = useState("");
  const [location, setlocation] = useState("");
  const [openings, setopenings] = useState("");
  const [job_type, setjob_type] = useState("");
  const [work_location, setwork_location] = useState("");
  const [is_active, setis_active] = useState(true);

  const clearInput = () => {
    settitle("");
    setdescription("");
    setrole("");
    setsalary("");
    setlocation("");
    setopenings("");
    setjob_type("");
    setwork_location("");
    setis_active(true);
  };

  const addJobHandler = async () => {
    setBtnLoading(true);
    try {
      const currentToken = Cookies.get("token");
      const jobData = {
        title,
        description,
        role,
        salary: Number(salary),
        location,
        openings: Number(openings),
        job_type,
        work_location,
        company_id: id,
      };

      await axios.post(`${job_service}/api/job/new`, jobData, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      toast.success("New job posted successfully");
      fetchCompany();
      clearInput();
      setIsAddModalOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (jobId: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      setBtnLoading(true);
      try {
        const currentToken = Cookies.get("token");
        await axios.delete(`${job_service}/api/job/${jobId}`, {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        toast.success("Job has been deleted");
        fetchCompany();
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setBtnLoading(false);
      }
    }
  };

  const handleOpenUpdateModal = (job: Job) => {
    setSelectedJob(job);
    settitle(job.title);
    setdescription(job.description);
    setrole(job.role);
    setsalary(String(job.salary || ""));
    setlocation(job.location || "");
    setopenings(String(job.openings));
    setjob_type(job.job_type);
    setwork_location(job.work_location);
    setis_active(job.is_active);
    setIsUpdatedModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdatedModalOpen(false);
    setSelectedJob(null);
    clearInput();
  };

  const updateJobHandler = async () => {
    if (!selectedJob) return;

    setBtnLoading(true);
    try {
      const currentToken = Cookies.get("token");
      const updateData = {
        title,
        description,
        role,
        salary: Number(salary),
        location,
        openings: Number(openings),
        job_type,
        work_location,
        is_active,
      };

      await axios.put(
        `${job_service}/api/job/${selectedJob.job_id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      toast.success("Job updated successfully");
      fetchCompany();
      handleCloseUpdateModal();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="min-h-screen bg-background">
      {company && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Card className="overflow-hidden neo-card rounded-none mb-8 dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)]">
            <div className="h-32 bg-amber-300 dark:bg-amber-500 border-b-3 border-black text-black"></div>
            <div className="px-8 pb-8 bg-zinc-50 dark:bg-zinc-900 text-foreground">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16">
                <div className="w-32 h-32 rounded-none border-4 border-black dark:border-zinc-100 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white shrink-0">
                  <img
                    src={company.logo}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 md:mb-4">
                  <h1 className="text-3xl font-black uppercase tracking-tight mb-2">{company.name}</h1>
                  <p className="text-sm font-semibold opacity-90 leading-relaxed max-w-3xl">
                    {company.description}
                  </p>
                </div>
                <Link
                  href={company.website}
                  target="_blank"
                  className="md:mb-4"
                >
                  <Button className="gap-2 neo-btn neo-btn-hover bg-rose-400 hover:bg-rose-500 text-black border-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] h-12 px-6">
                    <Globe size={18} />
                    Visit Website
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            {/* Job section */}
            <Card className="neo-card rounded-none dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] bg-background overflow-hidden">
              <div className="bg-amber-300 dark:bg-amber-500 border-b-3 border-black p-6 text-black">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 border-2 border-black bg-white flex items-center justify-center">
                      <Briefcase size={20} className="text-black" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-black uppercase text-black">
                    Open Positions
                  </h2>
                  <p className="text-sm font-bold text-black opacity-85 uppercase tracking-wide">
                    {company.jobs?.length || 0} active job
                    {company.jobs?.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {isRecruiterOwner && (
                <div className="px-6 pt-6">
                  <DialogTrigger asChild>
                    <Button className="gap-2 neo-btn neo-btn-hover bg-rose-400 hover:bg-rose-500 text-black border-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-extrabold uppercase">
                      <Plus size={18} />
                      Post New Job
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto neo-card rounded-none p-6 md:p-8 dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] bg-background">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-3xl font-black uppercase flex items-center gap-2">
                        <Briefcase className="text-rose-500" size={28} />
                        Post a new Job
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="title"
                          className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                        >
                          <Briefcase size={16} /> Job Title
                        </Label>
                        <Input
                          id="title"
                          type="text"
                          placeholder="Enter Job title"
                          className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                          value={title}
                          onChange={(e) => settitle(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="description"
                          className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                        >
                          <FileText size={16} /> Description
                        </Label>
                        <Input
                          id="description"
                          type="text"
                          placeholder="Enter Description"
                          className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                          value={description}
                          onChange={(e) => setdescription(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="role"
                          className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                        >
                          <Building2 size={16} /> Role/Department
                        </Label>
                        <Input
                          id="role"
                          type="text"
                          placeholder="Enter Job Role"
                          className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                          value={role}
                          onChange={(e) => setrole(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="salary"
                          className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                        >
                          <DollarSign size={16} /> Salary
                        </Label>
                        <Input
                          id="salary"
                          type="number"
                          placeholder="Enter salary"
                          className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold cursor-pointer"
                          value={salary}
                          onChange={(e) => setsalary(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="openings"
                          className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                        >
                          <Users size={16} /> Openings
                        </Label>
                        <Input
                          id="openings"
                          type="number"
                          placeholder="Eg. 5"
                          className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold cursor-pointer"
                          value={openings}
                          onChange={(e) => setopenings(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                        >
                          <MapPin size={16} /> Location
                        </Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="Enter location"
                          className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold cursor-pointer"
                          value={location}
                          onChange={(e) => setlocation(e.target.value)}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="job_type"
                            className="text-sm font-black uppercase tracking-wide flex items-center gap-1"
                          >
                            <Clock size={16} /> Job Type
                          </Label>
                          <select
                            value={job_type}
                            onChange={(e) => setjob_type(e.target.value)}
                            className="w-full h-12 px-3 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus:outline-none focus:ring-0 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold dark:bg-zinc-900"
                          >
                            <option value="" className="bg-background text-foreground dark:bg-zinc-900">Select job type</option>
                            <option value="Full-time" className="bg-background text-foreground dark:bg-zinc-900">Full-time</option>
                            <option value="Part-time" className="bg-background text-foreground dark:bg-zinc-900">Part-time</option>
                            <option value="Contract" className="bg-background text-foreground dark:bg-zinc-900">Contract</option>
                            <option value="Internship" className="bg-background text-foreground dark:bg-zinc-900">Internship</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="work_location"
                            className="text-sm font-black uppercase tracking-wide flex items-center gap-1"
                          >
                            <Laptop size={16} /> Work Location
                          </Label>
                          <select
                            value={work_location}
                            onChange={(e) => setwork_location(e.target.value)}
                            className="w-full h-12 px-3 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus:outline-none focus:ring-0 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold dark:bg-zinc-900"
                          >
                            <option value="" className="bg-background text-foreground dark:bg-zinc-900">Select Work Location</option>
                            <option value="On-site" className="bg-background text-foreground dark:bg-zinc-900">On-site</option>
                            <option value="Remote" className="bg-background text-foreground dark:bg-zinc-900">Remote</option>
                            <option value="Hybrid" className="bg-background text-foreground dark:bg-zinc-900">Hybrid</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="mt-8 gap-2 flex-col sm:flex-row">
                      <DialogClose asChild>
                        <Button className="h-12 neo-btn neo-btn-hover bg-white text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-1">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        disabled={btnLoading}
                        onClick={addJobHandler}
                        className="h-12 neo-btn neo-btn-hover bg-amber-300 hover:bg-amber-400 text-black border-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-1 font-black"
                      >
                        {btnLoading ? "Posting job..." : "Post Job"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </div>
              )}

              <div className="p-6">
                {company.jobs && company.jobs.length > 0 ? (
                  <div className="space-y-6">
                    {company.jobs.map((j) => (
                      <div
                        key={j.job_id}
                        className="p-5 border-3 border-black dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none"
                      >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                                {j.title}
                              </h3>

                              <span
                                className={`text-xs px-3 py-1 border-2 border-black font-extrabold uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 bg-background text-foreground`}
                              >
                                {j.is_active ? (
                                  <CheckCircle size={14} className="text-emerald-500" />
                                ) : (
                                  <XCircle size={14} className="text-rose-500" />
                                )}
                                {j.is_active ? "Active" : "Inactive"}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4">
                              <div className="flex items-center gap-1.5 px-3 py-1 border-2 border-black dark:border-zinc-100 bg-cyan-200 text-black font-extrabold text-xs rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <Building2 size={14} />
                                <span>{j.role}</span>
                              </div>
                              <div className="flex items-center gap-1.5 px-3 py-1 border-2 border-black dark:border-zinc-100 bg-emerald-200 text-black font-extrabold text-xs rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <DollarSign size={14} />
                                <span>
                                  {j.salary
                                    ? `₹ ${j.salary.toLocaleString()}`
                                    : "Not Disclosed"}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 px-3 py-1 border-2 border-black dark:border-zinc-100 bg-amber-200 text-black font-extrabold text-xs rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <MapPin size={14} />
                                <span>{j.location}</span>
                              </div>
                              <div className="flex items-center gap-1.5 px-3 py-1 border-2 border-black dark:border-zinc-100 bg-purple-200 text-black font-extrabold text-xs rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <Laptop size={14} />
                                <span>
                                  {j.work_location} ({j.job_type})
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 px-3 py-1 border-2 border-black dark:border-zinc-100 bg-rose-200 text-black font-extrabold text-xs rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <Users size={14} />
                                <span>{j.openings} openings</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Link href={`/jobs/${j.job_id}`}>
                              <Button
                                size={"sm"}
                                className="gap-2 neo-btn neo-btn-hover bg-white text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-2 h-10"
                              >
                                <Eye size={16} /> View
                              </Button>
                            </Link>

                            {isRecruiterOwner && (
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleOpenUpdateModal(j)}
                                  size={"sm"}
                                  className="gap-2 neo-btn neo-btn-hover bg-amber-300 hover:bg-amber-400 text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-2 h-10"
                                >
                                  <Pencil size={16} />
                                  Edit
                                </Button>
                                <Button
                                  onClick={() => deleteHandler(j.job_id)}
                                  size={"sm"}
                                  className="gap-2 neo-btn neo-btn-hover bg-rose-400 hover:bg-rose-500 text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-2 h-10"
                                >
                                  <Trash2 size={16} />
                                  Delete
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 border-3 border-black dark:border-zinc-100 bg-white dark:bg-zinc-800 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)] rounded-none">
                        <Briefcase size={32} className="text-black dark:text-zinc-100" />
                      </div>
                      <p className="text-base font-bold opacity-80 mb-2">
                        No jobs posted yet
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </Dialog>

          <Dialog
            open={isUpdatedModalOpen}
            onOpenChange={setIsUpdatedModalOpen}
          >
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto neo-card rounded-none p-6 md:p-8 dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] bg-background">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-3xl font-black uppercase flex items-center gap-2">
                  <Pencil className="text-rose-500" size={28} />
                  Update Job
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                  >
                    <Briefcase size={16} /> Job Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter Job title"
                    className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                  >
                    <FileText size={16} /> Description
                  </Label>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Enter Description"
                    className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="role"
                    className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                  >
                    <Building2 size={16} /> Role/Department
                  </Label>
                  <Input
                    id="role"
                    type="text"
                    placeholder="Enter Job Role"
                    className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="salary"
                    className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                  >
                    <DollarSign size={16} /> Salary
                  </Label>
                  <Input
                    id="salary"
                    type="number"
                    placeholder="Enter salary"
                    className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold cursor-pointer"
                    value={salary}
                    onChange={(e) => setsalary(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="openings"
                    className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                  >
                    <Users size={16} /> Openings
                  </Label>
                  <Input
                    id="openings"
                    type="number"
                    placeholder="Eg. 5"
                    className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold cursor-pointer"
                    value={openings}
                    onChange={(e) => setopenings(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                  >
                    <MapPin size={16} /> Location
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter location"
                    className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold cursor-pointer"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="job_type"
                      className="text-sm font-black uppercase tracking-wide flex items-center gap-1"
                    >
                      <Clock size={16} /> Job Type
                    </Label>
                    <select
                      value={job_type}
                      onChange={(e) => setjob_type(e.target.value)}
                      className="w-full h-12 px-3 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus:outline-none focus:ring-0 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold dark:bg-zinc-900"
                    >
                      <option value="" className="bg-background text-foreground dark:bg-zinc-900">Select job type</option>
                      <option value="Full-time" className="bg-background text-foreground dark:bg-zinc-900">Full-time</option>
                      <option value="Part-time" className="bg-background text-foreground dark:bg-zinc-900">Part-time</option>
                      <option value="Contract" className="bg-background text-foreground dark:bg-zinc-900">Contract</option>
                      <option value="Internship" className="bg-background text-foreground dark:bg-zinc-900">Internship</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="work_location"
                      className="text-sm font-black uppercase tracking-wide flex items-center gap-1"
                    >
                      <Laptop size={16} /> Work Location
                    </Label>
                    <select
                      value={work_location}
                      onChange={(e) => setwork_location(e.target.value)}
                      className="w-full h-12 px-3 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus:outline-none focus:ring-0 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold dark:bg-zinc-900"
                    >
                      <option value="" className="bg-background text-foreground dark:bg-zinc-900">Select Work Location</option>
                      <option value="On-site" className="bg-background text-foreground dark:bg-zinc-900">On-site</option>
                      <option value="Remote" className="bg-background text-foreground dark:bg-zinc-900">Remote</option>
                      <option value="Hybrid" className="bg-background text-foreground dark:bg-zinc-900">Hybrid</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="update-is_active"
                      className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                    >
                      Job Status
                    </Label>
                    <select
                      value={is_active ? "true" : "false"}
                      onChange={(e) => setis_active(e.target.value === "true")}
                      className="w-full h-12 px-3 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus:outline-none focus:ring-0 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold dark:bg-zinc-900"
                    >
                      <option value="true" className="bg-background text-foreground dark:bg-zinc-900">Active</option>
                      <option value="false" className="bg-background text-foreground dark:bg-zinc-900">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-8 gap-2 flex-col sm:flex-row">
                <DialogClose asChild>
                  <Button className="h-12 neo-btn neo-btn-hover bg-white text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-1">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={btnLoading}
                  onClick={updateJobHandler}
                  className="h-12 neo-btn neo-btn-hover bg-amber-300 hover:bg-amber-400 text-black border-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-1 font-black"
                >
                  {btnLoading ? "Updating job..." : "Update Job"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
