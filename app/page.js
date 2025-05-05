"use client";
import styles from "./page.module.css";
import SignUp from "./pages/SignUp/SignUp.jsx";
import { useAuthStore } from "./store/authStore.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import React, { useEffect } from "react";

function Home() {
  const { user, loading, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    console.log("Current user:", user); // Debug log
  }, [user]);
  if (loading) return <div>Loading...</div>;
  console.log("usersdd", user);

  if (user) {
    if ("error" in user) {
      return <SignUp />;
    } else return <HomePage />;
  } else return <SignUp />;
}

export default Home;
