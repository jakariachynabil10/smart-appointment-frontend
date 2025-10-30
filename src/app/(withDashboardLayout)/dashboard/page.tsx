"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";

const DashboardPage = () => {
  const userInfo = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) return; // wait until user info loads

    // Redirect based on role
    if (userInfo.role === "admin") {
      router.replace("/dashboard/admin");
    } else if (userInfo.role === "specialist") {
      router.replace("/dashboard/provider");
    } else {
      router.replace("/dashboard/user");
    }
  }, [userInfo, router]);

  return null; // nothing to render — just redirects
};

export default DashboardPage;
