"use client";

import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

function Create() {
  const [mess, setMess] = useState<any>();

  // const { data: session } = useSession();
  // console.log(session);

  const createInsight = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/create-insight", {
        tag: "instagram",
        question: "how second question is?"
      });
      setMess(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <button onClick={createInsight}>Create</button>
      <h3>{mess}</h3>
    </div>
  );
}

export default Create;
