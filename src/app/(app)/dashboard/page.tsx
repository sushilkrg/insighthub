"use client";

import InsightCard from "@/components/InsightCard";
import { Button } from "@/components/ui/button";
import { Insight } from "@/model/User";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const router = useRouter();

  const getInsights = async () => {
    const insightsData = await axios.get("/api/get-insights");
    console.log(insightsData?.data?.insightsData);
    setInsights(insightsData?.data?.insightsData);
  };

  useEffect(() => {
    getInsights();
  }, []);

  if (!insights || insights.length == 0) {
    return (
      <div>
        <h3>No Insight created.</h3>
      </div>
    );
  }

  const handleClick = () => {
    router.replace("/create");
  };

  return (
    <div className="container mx-auto mt-8 mb-4 px-6 min-h-screen text-center ">
      <div className="flex items-center justify-between m-2">
        <h2 className="text-lg font-bold">Dashboard </h2>
        <Button onClick={handleClick}>+ Create</Button>
      </div>
      <div className="grid gap-2 md:grid-cols-2 grid-col-1 ">
        {insights.map((insight) => (
          <Link href={`/insight/${insight._id}`}>
            <InsightCard key={insight._id} insight={insight} />
          </Link>
        ))}
      </div>
    </div>
  );
}
