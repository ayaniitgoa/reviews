// src/app/dashboard/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore.jsx";
import TopBar from "@/app/components/TopBar/TopBar.jsx";
import LocationHomePage from "@/app/components/LocationHomePage/LocationHomePage.jsx";

function HomePage() {
  const router = useRouter();
  const { user, loading, logout } = useAuthStore();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="">
      <TopBar />
      {/* <div className="">
        <p>Welcome, {user.name}</p>
        <p>Email: {user.email}</p>
      </div> */}
      <LocationHomePage />
    </div>
  );
}

export default HomePage;
