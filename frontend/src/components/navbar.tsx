"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Briefcase, Home, Info, LogOut, Menu, User, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { useAppData } from "@/context/AppContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuth, user, setIsAuth, setUser, loading, logoutUser } =
    useAppData();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    logoutUser();
  };
  return (
    <nav className="z-50 sticky top-0 bg-background border-b-4 border-black dark:border-zinc-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/home" className="flex items-center gap-1 group">
              <div className="text-2xl font-bold tracking-tight">
                <span className="bg-foreground text-background px-2 py-0.5 border-2 border-black dark:border-white font-black uppercase">
                  ProHire
                </span>
                <span className="text-red-500 ml-1 font-black uppercase tracking-wider">Nexus</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/home">
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 font-black uppercase tracking-tight hover:bg-yellow-300 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-colors"
              >
                <Home size={16} /> Home
              </Button>
            </Link>

            <Link href={"/jobs"}>
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 font-black uppercase tracking-tight hover:bg-lime-400 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-colors"
              >
                <Briefcase size={16} /> Jobs
              </Button>
            </Link>

            <Link href={"/about"}>
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 font-black uppercase tracking-tight hover:bg-orange-400 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-colors"
              >
                <Info size={16} /> About
              </Button>
            </Link>
          </div>

          {/* Right side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              ""
            ) : (
              <>
                {isAuth ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center gap-2 hover:opacity-85 transition-all">
                        <Avatar className="h-9 w-9 border-2 border-black dark:border-white cursor-pointer hover:scale-105 transition-transform">
                          <AvatarImage
                            src={user ? (user.profile_pic as string) : ""}
                            alt={user ? user.name : ""}
                          />
                          <AvatarFallback className="bg-yellow-300 text-black font-bold">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-56 p-2 neo-card border-3" align="end">
                      <div className="px-3 py-2 mb-2 border-b-2 border-black dark:border-zinc-700">
                        <p className="text-sm font-black uppercase tracking-tight">
                          {user && user.name}
                        </p>
                        <p className="text-xs opacity-60 truncate">
                          {user && user.email}
                        </p>
                      </div>

                      <Link href={"/account"}>
                        <Button
                          className="w-full justify-start gap-2 font-bold hover:bg-yellow-300 hover:text-black"
                          variant={"ghost"}
                        >
                          <User size={16} /> My Profile
                        </Button>
                      </Link>

                      <Button
                        className="w-full justify-start gap-2 mt-1 font-bold hover:bg-red-500 hover:text-white"
                        variant={"ghost"}
                        onClick={logoutHandler}
                      >
                        <LogOut size={16} />
                        Logout
                      </Button>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Link href={"/login"}>
                    <Button className="neo-btn neo-btn-hover bg-yellow-300 hover:bg-yellow-400 text-black border-2 border-black gap-2 h-9 px-4">
                      <User size={16} />
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ModeToggle />

            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile view */}
      <div
        className={`md:hidden border-t overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 py-3 space-y-1 bg-background/95 backdrop-blur-md">
          {/* isauth or user */}
          <Link href="/home" onClick={toggleMenu}>
            <Button
              variant={"ghost"}
              className="w-full justify-start gap-3 h-11"
            >
              <Home size={18} /> Home
            </Button>
          </Link>

          <Link href={"/jobs"} onClick={toggleMenu}>
            <Button
              variant={"ghost"}
              className="w-full justify-start gap-3 h-11"
            >
              <Briefcase size={18} /> Jobs
            </Button>
          </Link>

          <Link href={"/about"} onClick={toggleMenu}>
            <Button
              variant={"ghost"}
              className="w-full justify-start gap-3 h-11"
            >
              <Info size={18} /> About
            </Button>
          </Link>

          {isAuth ? (
            <>
              <Link href={"/account"} onClick={toggleMenu}>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start gap-3 h-11"
                >
                  <User size={18} /> My Profile
                </Button>
              </Link>
              <Button
                variant={"destructive"}
                className="w-full justify-start gap-3 h-11"
                onClick={() => {
                  logoutHandler();
                  toggleMenu();
                }}
              >
                <LogOut size={18} /> Logout
              </Button>
            </>
          ) : (
            <Link href={"/login"} onClick={toggleMenu}>
              <Button className="w-full justify-start gap-3 h-11 mt-2">
                <User size={18} /> Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
