"use client";

import { useState } from "react"

import CreateTourment from "@/app/ui/Tournaments/CreateTourment";
import ListTourments from "@/app/ui/Tournaments/ListTourment";
import { Suspense } from "react";

export default function AdminTournamentsPage() {
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState("")
  return (
    <>
      <CreateTourment setReload={setReload}/>
      <Suspense fallback="loading...">
        <ListTourments setReload={setReload} reload={reload} filter={filter}/>
      </Suspense>

    </>
  )
}
