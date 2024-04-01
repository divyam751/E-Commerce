"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    redirect("/home");
  }, []);

  return (
    <main className="app">
      <h1>Home Route</h1>
    </main>
  );
}
