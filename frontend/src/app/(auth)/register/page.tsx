"use client";
import { auth_service, useAppData } from "@/context/AppContext";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Label } from "@/components/ui/label";
import { ArrowRight, Briefcase, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/loading";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const { isAuth, setUser, loading, setIsAuth } = useAppData();

  if (loading) return <Loading />;

  if (isAuth) return redirect("/");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBtnLoading(true);
    const formData = new FormData();

    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);

    if (role === "jobseeker") {
      formData.append("bio", bio);
      if (resume) {
        formData.append("file", resume);
      }
    }
    try {
      const { data } = await axios.post(
        `${auth_service}/api/auth/register`,
        formData,
      );

      toast.success(data.message);

      Cookies.set("token", data.token, {
        expires: 15,
        secure: false,
        path: "/",
      });
      setUser(data.registeredUser);
      setIsAuth(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMessage);
      setIsAuth(false);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center justify-center space-y-2">
          <div className="inline-block bg-red-500 text-white font-black text-xs uppercase px-2.5 py-1 border-2 border-black rotate-1">
            Register Fr Fr
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-foreground whitespace-nowrap w-max">
            Join the Nexus
          </h1>
          <p className="text-xs uppercase tracking-wider font-bold opacity-70">
            Create your account to start a new journey
          </p>
        </div>
        <div className="neo-card p-8 bg-zinc-50 dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(250,250,250,1)]">
          <form onSubmit={submitHandler} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs uppercase font-black tracking-wider">
                I want to
              </Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-11 px-4 border-3 border-black dark:border-zinc-700 bg-background text-foreground focus:outline-none focus:ring-0 rounded-none font-bold"
                required
              >
                <option value="" className="bg-background text-foreground">Select your role</option>
                <option value="jobseeker" className="bg-background text-foreground">Find a Job</option>
                <option value="recruiter" className="bg-background text-foreground">Hire Talent</option>
              </select>
            </div>

            {role && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase font-black tracking-wider">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-11 border-3 border-black dark:border-zinc-700 bg-background text-foreground focus-visible:ring-0 focus-visible:border-red-500 rounded-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase font-black tracking-wider">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 border-3 border-black dark:border-zinc-700 bg-background text-foreground focus-visible:ring-0 focus-visible:border-red-500 rounded-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs uppercase font-black tracking-wider">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 border-3 border-black dark:border-zinc-700 bg-background text-foreground focus-visible:ring-0 focus-visible:border-red-500 rounded-none font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs uppercase font-black tracking-wider">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="number"
                    placeholder="+91 1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="h-11 border-3 border-black dark:border-zinc-700 bg-background text-foreground focus-visible:ring-0 focus-visible:border-red-500 rounded-none font-bold"
                  />
                </div>

                {role === "jobseeker" && (
                  <div className="space-y-5 pt-4 border-t-2 border-dashed border-black dark:border-zinc-700">
                    <div className="space-y-2">
                      <Label htmlFor="resume" className="text-xs uppercase font-black tracking-wider">
                        Resume (PDF)
                      </Label>
                      <Input
                        id="resume"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResume(e.target.files[0]);
                          }
                        }}
                        className="h-11 cursor-pointer border-3 border-black dark:border-zinc-700 bg-background text-foreground focus-visible:ring-0 focus-visible:border-red-500 rounded-none font-bold file:bg-zinc-950 file:text-white file:border-0 dark:file:bg-zinc-800 dark:file:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-xs uppercase font-black tracking-wider">
                        Bio
                      </Label>
                      <Input
                        id="bio"
                        type="text"
                        placeholder="Tell us about yourself..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        required
                        className="h-11 border-3 border-black dark:border-zinc-700 bg-background text-foreground focus-visible:ring-0 focus-visible:border-red-500 rounded-none font-bold"
                      />
                    </div>
                  </div>
                )}

                <Button disabled={btnLoading} className="neo-btn neo-btn-hover w-full h-11 bg-yellow-300 hover:bg-yellow-400 text-black border-3 border-black gap-2">
                  {btnLoading ? "Please Wait..." : "Register"}
                  <ArrowRight size={18} />
                </Button>
              </div>
            )}
          </form>

          <div className="mt-6 pt-6 border-t-2 border-dashed border-black dark:border-zinc-700">
            <p className="text-center text-xs font-bold uppercase tracking-wider">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="text-red-500 hover:underline transition-all"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
