"use client";

import InsightCard from "@/components/InsightCard";
import { Button } from "@/components/ui/button";
import { Insight } from "@/model/User";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserDashboard() {

    const [insights, setInsights]= useState<Insight[]>([]);
    console.log(insights);
    

    // const session = useSession();
    // console.log(session?.data?.user);

    // const {username} = session?.data?.user;
    // console.log("username-", username);

    const getInsights = async () => {
        const insightsData = await axios.get('/api/get-insights');
        console.log(insightsData?.data?.insightsData);
        setInsights(insightsData?.data?.insightsData);
    }

    useEffect(() => {
        getInsights();
    },[])
    
    if(!insights || insights.length == 0){
        return (<div><h3>No Insight created.</h3></div>)
    }
  return (
    <div className="container mx-auto mt-8 mb-4 min-h-screen text-center ">
      <div className="flex items-center justify-between m-2">
        <h2>Dashboard </h2>
        <Button>+ Create</Button>
      </div>
      <div className="grid gap-2 md:grid-cols-2 grid-col-1 ">
        {insights.map((insight) => (
            <InsightCard key={insight._id} insight={insight}/>
        ))}
      </div>

    </div>
  );
}
