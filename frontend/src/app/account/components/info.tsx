import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppData } from "@/context/AppContext";
import { AccountProps } from "@/type";
import {
  AlertTriangle,
  Briefcase,
  Camera,
  CheckCircle2,
  Crown,
  Edit,
  FileText,
  Mail,
  NotepadText,
  Phone,
  RefreshCcw,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";

const Info: React.FC<AccountProps> = ({ user, isYourAccount }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resumeRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { updateProfilePic, updateResume, btnLoading, updateUser } =
    useAppData();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      updateProfilePic(formData);
    }
  };

  const handleEditClick = () => {
    setName(user.name);
    setPhoneNumber(user.phone_number);
    setBio(user.bio || "");
    setIsEditOpen(true);
  };

  const updateProfileHandler = async () => {
    const success = await updateUser(name, phoneNumber, bio);
    if (success) {
      setIsEditOpen(false);
    }
  };

  const handleResumeClick = () => {
    resumeRef.current?.click();
  };

  const changeResume = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      updateResume(formData);
    }
  };

  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Card className="overflow-hidden neo-card rounded-none dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] bg-background">
        <div className="h-32 bg-amber-300 dark:bg-amber-500 relative border-b-3 border-black text-black">
          <div className="absolute -bottom-16 left-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-none border-4 border-black dark:border-zinc-100 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                <img
                  src={user.profile_pic ? user.profile_pic : "/user.png"}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* edit option for your profile pic */}
              {isYourAccount && (
                <>
                  <Button
                    onClick={handleClick}
                    className="absolute bottom-0 right-0 rounded-none border-2 border-black bg-rose-400 text-black hover:bg-rose-500 h-10 w-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-0"
                  >
                    <Camera size={18} />
                  </Button>

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={inputRef}
                    onChange={changeHandler}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pt-20 pb-8 px-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black uppercase text-foreground">{user.name}</h1>
                {/* Edit button */}
                {isYourAccount && (
                  <Button
                    className="h-8 w-8 border border-black rounded-none bg-white hover:bg-zinc-100 text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-0"
                    onClick={handleEditClick}
                  >
                    <Edit size={16} />
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm font-bold opacity-80">
                <Briefcase size={16} />
                <span className="capitalize">{user.role}</span>
              </div>
            </div>
          </div>

          {/* Bio section */}
          {user.role === "jobseeker" && user.bio && (
            <div className="mt-6 p-5 border-3 border-black dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none">
              <div className="flex items-center gap-2 mb-2 text-sm font-extrabold uppercase tracking-wide opacity-80 text-foreground">
                <FileText size={16} />
                <span>About</span>
              </div>
              <p className="text-base font-semibold leading-relaxed text-foreground/90">{user.bio}</p>
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-8">
            <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
              <Mail size={20} className="text-rose-500" />
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border-3 border-black dark:border-zinc-100 bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none">
                <div className="h-10 w-10 border-2 border-black bg-cyan-200 text-black flex items-center justify-center rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Mail size={18} className="text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase opacity-70">Email</p>
                  <p className="text-sm font-extrabold truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border-3 border-black dark:border-zinc-100 bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none">
                <div className="h-10 w-10 border-2 border-black bg-rose-200 text-black flex items-center justify-center rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Phone size={18} className="text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase opacity-70">Phone</p>
                  <p className="text-sm font-extrabold truncate">{user.phone_number}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resume section */}
          {user.role === "jobseeker" && user.resume && (
            <div className="mt-8">
              <h2 className="text-xl font-black uppercase mt-6 flex items-center gap-2">
                <NotepadText size={20} className="text-rose-500" />
                Resume
              </h2>

              <div className="flex items-center gap-3 p-4 border-3 border-black dark:border-zinc-100 bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none">
                <div className="h-12 w-12 border-2 border-black bg-rose-300 text-black flex items-center justify-center rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <NotepadText size={20} className="text-black" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-extrabold uppercase">Resume Document</p>
                  <Link
                    href={user.resume}
                    className="text-sm text-rose-600 hover:underline font-bold uppercase tracking-wide mt-0.5 inline-block"
                    target="_blank"
                  >
                    View Resume PDF
                  </Link>
                </div>
                {/* edit button */}

                <Button
                  onClick={handleResumeClick}
                  className="gap-2 neo-btn neo-btn-hover bg-white text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] h-9 px-4"
                >
                  Update
                </Button>
                <input
                  type="file"
                  ref={resumeRef}
                  className="hidden"
                  accept="application/pdf"
                  onChange={changeResume}
                />
              </div>
            </div>
          )}

          {/* subscription section */}
          {isYourAccount && (
            <>
              {user.role === "jobseeker" && (
                <div className="mt-8">
                  <h2 className="text-xl font-black uppercase mt-6 flex items-center gap-2">
                    <Crown size={20} className="text-rose-500" />
                    Subscription Status
                  </h2>

                  <div className="p-6 border-3 border-black dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] rounded-none">
                    {!user.subscription ? (
                      <>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div>
                            <p className="font-extrabold uppercase text-lg mb-1">
                              No Active Subscription
                            </p>
                            <p className="text-sm font-semibold opacity-75">
                              Subscribe to unlock premium features and benefits, fam.
                            </p>
                          </div>
                          <Button
                            className="gap-2 h-12 neo-btn neo-btn-hover bg-amber-300 hover:bg-amber-400 text-black border-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-5"
                            onClick={() => router.push("/subscribe")}
                          >
                            <Crown size={18} />
                            Subscribe Now
                          </Button>
                        </div>
                      </>
                    ) : new Date(user.subscription).getTime() > Date.now() ? (
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2
                              size={20}
                              className="text-emerald-500"
                            />
                            <p className="font-black uppercase text-lg text-emerald-500">
                              Active Subscription
                            </p>
                          </div>
                          <p className="text-sm font-semibold opacity-80">
                            Valid until:{" "}
                            {new Date(user.subscription).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-emerald-300 text-black font-extrabold uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <CheckCircle2 size={18} />
                          Subscribed
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle
                                size={20}
                                className="text-rose-500"
                              />
                              <p className="font-black uppercase text-lg text-rose-500">
                                Subscription Expired
                              </p>
                            </div>

                            <p className="text-sm font-semibold opacity-80">
                              Expired On:{" "}
                              {new Date(user.subscription).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>

                          <Button
                            className="gap-2 h-12 neo-btn neo-btn-hover bg-rose-400 hover:bg-rose-500 text-black border-3 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-5"
                            onClick={() => router.push("/subscribe")}
                          >
                            <RefreshCcw size={18} />
                            Renew Subscription
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Card>

      {/* Dialog box for edit */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>

        <DialogContent className="sm:max-w-[500px] neo-card rounded-none p-6 md:p-8 dark:border-zinc-100 dark:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] bg-background">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-black uppercase text-foreground">Edit profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-2">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
              >
                <UserIcon size={16} /> Full Name
              </Label>

              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
              >
                <Phone size={16} /> Phone
              </Label>

              <Input
                id="phone"
                type="number"
                placeholder="Enter your Phone Number"
                className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {user.role === "jobseeker" && (
              <div className="space-y-2">
                <Label
                  htmlFor="bio"
                  className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
                >
                  <FileText size={16} /> Bio
                </Label>

                <Input
                  id="bio"
                  type="text"
                  placeholder="Enter your Bio"
                  className="h-12 border-3 border-black dark:border-zinc-100 bg-background text-foreground focus-visible:ring-0 focus-visible:border-rose-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            )}

            <DialogFooter className="mt-8">
              <Button
                disabled={btnLoading}
                onClick={updateProfileHandler}
                className="w-full h-14 neo-btn neo-btn-hover bg-amber-300 hover:bg-amber-400 text-black border-3 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                type="submit"
              >
                {btnLoading ? "Saving Changes..." : "Save changes"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Info;
