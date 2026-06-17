"use client";

import { AppContextType, Application, AppProviderProps, User } from "@/type";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

export const utils_service = "http://localhost:5001";
export const auth_service = "http://localhost:5000";
export const user_service = "http://localhost:5002";
export const job_service = "http://localhost:5003";
export const payment_service = "http://localhost:5004";

const AppContext = createContext<AppContextType | undefined>(undefined);

const getErrorMessage = (error: any): string => {
  return (
    error.response?.data?.message || error.message || "Something went wrong"
  );
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  async function fetchUser() {
    const currentToken = Cookies.get("token");
    try {
      const { data } = await axios.get(`${user_service}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfilePic(formData: any) {
    const currentToken = Cookies.get("token");
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/update/pic`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );

      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function updateResume(formData: any) {
    const currentToken = Cookies.get("token");
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/update/resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );

      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(name: string, phoneNumber: string, bio: string) {
    const currentToken = Cookies.get("token");
    setBtnLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/update/profile`,
        { name, phoneNumber, bio },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );
      toast.success(data.message);
      fetchUser();
      return true;
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      return false;
    } finally {
      setBtnLoading(false);
    }
  }

  async function logoutUser() {
    Cookies.set("token", "");
    setUser(null);
    setIsAuth(false);
    toast.success("Logged out successfully");
  }

  async function addSkill(
    skill: string,
    setSkill: React.Dispatch<React.SetStateAction<string>>,
  ) {
    const currentToken = Cookies.get("token");
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${user_service}/api/user/skill/add`,
        { skillName: skill },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );
      toast.success(data.message);
      setSkill("");
      fetchUser();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setBtnLoading(false);
    }
  }

  async function removeSkill(skill: string) {
    const currentToken = Cookies.get("token");
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/skill/delete`,
        { skillName: skill },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );
      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
  }

  async function applyJob(job_id: number) {
    const currentToken = Cookies.get("token");
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${user_service}/api/user/apply/job`,
        { job_id },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );

      toast.success(data.message);
      fetchApplications();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setBtnLoading(false);
    }
  }

  const [applications, setApplications] = useState<Application[]>([]);

  async function fetchApplications() {
    const currentToken = Cookies.get("token");
    try {
      const { data } = await axios.get(
        `${user_service}/api/user/application/all`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );

      setApplications(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchApplications();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        btnLoading,
        setUser,
        isAuth,
        setIsAuth,
        setLoading,
        logoutUser,
        updateProfilePic,
        updateResume,
        updateUser,
        addSkill,
        removeSkill,
        applyJob,
        applications,
        fetchApplications,
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within AppProvider");
  }
  return context;
};
