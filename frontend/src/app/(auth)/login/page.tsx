"use client";
import { auth_service, useAppData } from "@/context/AppContext";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const { isAuth, setUser, loading, setIsAuth, fetchApplications } =
    useAppData();

  if (loading) return <Loading />;

  if (isAuth) return redirect("/");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${auth_service}/api/auth/login`, {
        email,
        password,
      });

      toast.success(data.message);

      Cookies.set("token", data.token, {
        expires: 15,
        secure: false,
        path: "/",
      });
      setUser(data.userObject);
      setIsAuth(true);
      fetchApplications();
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
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
            Sign In Fr Fr
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-foreground whitespace-nowrap w-max">
            Welcome back, chief
          </h1>
          <p className="text-xs uppercase tracking-wider font-bold opacity-70">Sign in to continue your journey</p>
        </div>
        <div className="neo-card p-8 bg-zinc-50 dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(250,250,250,1)]">
          <form onSubmit={submitHandler} className="space-y-5">
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

            <div className="flex items-center justify-end">
              <Link
                href={"/forgot"}
                className="text-xs font-bold text-red-500 hover:underline tracking-wider uppercase"
              >
                Forgot Password?
              </Link>
            </div>

            <Button disabled={btnLoading} className="neo-btn neo-btn-hover w-full h-11 bg-yellow-300 hover:bg-yellow-400 text-black border-3 border-black gap-2">
              {btnLoading ? "Signing in..." : "Sign In"}
              <ArrowRight size={18} />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-dashed border-black dark:border-zinc-700">
            <p className="text-center text-xs font-bold uppercase tracking-wider">
              Don't have an account?{" "}
              <Link
                href={"/register"}
                className="text-red-500 hover:underline transition-all"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
