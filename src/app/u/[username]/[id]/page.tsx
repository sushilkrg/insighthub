'use client'

import { useParams } from "next/navigation"

export default function page() {

    const {username, id} = useParams();
  return (
    <div>public link page</div>
  )
}
