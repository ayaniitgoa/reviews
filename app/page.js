"use client";
import { useAuthStore } from "@/app/store/authStore";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";

function Home() {
  const { user, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    console.log("Current user:", user); // Debug log
  }, [user]);
  if (loading) return <LoadingScreen />;
  console.log("usersdd", user);

  if (user) {
    if ("error" in user) {
      redirect("/sign-up");
    } else redirect("/home");
  } else return redirect("/sign-up");
}

export default Home;
