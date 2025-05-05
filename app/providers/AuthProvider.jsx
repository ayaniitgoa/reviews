"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/authStore.jsx";

export default function AuthProvider({ children }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  console.log("reachedd");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}
