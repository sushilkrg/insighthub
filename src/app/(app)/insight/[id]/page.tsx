"use client";

import { useParams } from "next/navigation";

export default function Insight() {
  const { id } = useParams();
  return <div>Insight by {id}</div>;
}
