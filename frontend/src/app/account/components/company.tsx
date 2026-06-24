"use client";
import { job_service, useAppData } from "@/context/AppContext";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Building2,
  Eye,
  FileText,
  Globe,
  Image,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Company as CompanyType } from "@/type";
import Link from "next/link";
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

const Company = () => {
  const { loading } = useAppData();

  const [isAddOpen, setIsAddOpen] = useState(false);

  const openDialog = () => {
    setIsAddOpen(true);
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyType[]>([]);

  const clearData = () => {
    setName("");
    setDescription("");
    setWebsite("");
    setLogo(null);
  };

  const [companyLoading, setCompanyLoading] = useState(true);

  async function fetchCompanies() {
    const currentToken = Cookies.get("token");
    try {
      const { data } = await axios.get(`${job_service}/api/job/company/all`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      setCompanies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCompanyLoading(false);
    }
  }

  async function addCompanyHandler() {
    if (!name || !description || !website || !logo) {
      return alert("Please Provide all details");
    }

    const currentToken = Cookies.get("token");
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("file", logo);

    try {
      setBtnLoading(true);
      const { data } = await axios.post(
        `${job_service}/api/job/company/new`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );
      toast.success(data.message);
      clearData();
      fetchCompanies();
      setIsAddOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }

  async function deleteCompany(id: string) {
    if (confirm("Are you sure you want to delete this company")) {
      try {
        const currentToken = Cookies.get("token");
        setBtnLoading(true);
        const { data } = await axios.delete(
          `${job_service}/api/job/company/${id}`,
          {
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          }
        );

        toast.success(data.message);
        fetchCompanies();
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setBtnLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Card className="neo-card rounded-none dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] bg-background overflow-hidden">
        <div className="bg-amber-300 dark:bg-amber-500 p-6 border-b-3 border-black text-black">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 border-2 border-black bg-white flex items-center justify-center">
                <Building2 size={20} className="text-black" />
              </div>
            </div>
            <CardTitle className="text-2xl font-black uppercase text-black">My Companies</CardTitle>
            <CardDescription className="text-sm mt-1 text-black font-semibold uppercase tracking-wide">
              Manage your registered companies ({companies.length}/3)
            </CardDescription>

            {companies.length < 3 && (
              <Button onClick={openDialog} className="gap-2 h-12 neo-btn neo-btn-hover bg-rose-400 hover:bg-rose-500 text-black border-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Plus size={18} />
                Add Company
              </Button>
            )}
          </div>
        </div>

        {companyLoading ? (
          <Loading />
        ) : (
          <div className="p-6">
            {companies.length > 0 ? (
              <div className="grid gap-6">
                {companies.map((c) => (
                  <div
                    key={c.company_id}
                    className="flex items-center gap-4 p-5 border-3 border-black dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none"
                  >
                    <div className="h-16 w-16 border-3 border-black dark:border-zinc-100 overflow-hidden shrink-0 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)] rounded-none">
                      <img
                        src={c.logo}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Company Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black uppercase tracking-tight text-lg mb-1 truncate text-foreground">
                        {c.name}
                      </h3>
                      <p className="text-sm font-semibold opacity-80 line-clamp-2 mb-2 text-foreground">
                        {c.description}
                      </p>
                      <a
                        href={c.website}
                        target="_blank"
                        className="text-xs text-rose-500 font-extrabold hover:underline flex items-center gap-1 mt-1"
                      >
                        <Globe size={12} />
                        {c.website}
                      </a>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                      <Link href={`/company/${c.company_id}`}>
                        <Button
                          size={"icon"}
                          className="h-10 w-10 neo-btn neo-btn-hover bg-white text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-0"
                        >
                          <Eye size={16} />
                        </Button>
                      </Link>

                      <Button
                        size={"icon"}
                        className="h-10 w-10 neo-btn neo-btn-hover bg-rose-400 text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-rose-500 flex items-center justify-center p-0"
                        onClick={() => deleteCompany(c.company_id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 border-3 border-black dark:border-zinc-100 bg-white dark:bg-zinc-800 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)] rounded-none">
                    <Building2 size={32} className="text-black dark:text-zinc-100" />
                  </div>
                  <CardDescription className="text-base font-bold text-foreground mb-4">
                    No Companies registered yet
                  </CardDescription>
                  <p className="text-sm font-semibold opacity-70">
                    Add your first company to start posting jobs, fam.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </Card>

      {/* Add Company Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[550px] neo-card rounded-none p-6 md:p-8 dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] bg-background">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-black uppercase flex items-center gap-2">
              <Building2 className="text-rose-500" size={28} />
              Add New Company
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-2">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
              >
                <Briefcase size={16} /> Company Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter company name"
                className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="website"
                className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
              >
                <Globe size={16} /> Website
              </Label>
              <Input
                id="website"
                type="text"
                placeholder="https://example.com"
                className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="logo"
                className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
              >
                <Image size={16} /> Company Logo
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold cursor-pointer py-2.5"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLogo(e.target.files?.[0] || null)
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-8">
            <Button
              disabled={btnLoading}
              onClick={addCompanyHandler}
              className="w-full h-14 neo-btn neo-btn-hover bg-amber-300 hover:bg-amber-400 text-black border-3 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {btnLoading ? "Adding Company..." : "Add Company"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Company;
