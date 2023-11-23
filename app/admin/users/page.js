"use client";

import { useState, useEffect} from "react";
import { Box, Grid, Typography } from "@mui/material"
import ListUsers from "@/app/ui/Users/ListUsers";
import Loading from "@/app/ui/Shared/Loading";

export default function AdminUserPage() {

  const [users, setUsers] = useState([])
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try{
      setLoading(true)
      const res = await fetch("/api/users");
      const data = await res.json();

      if (data?.status === "success") {
        setUsers(data?.data);
      }
    }catch(err) {
      console.error(err)
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [reload])
  return (
    <Box>
      {loading ? <Loading /> : users?.length ? users.map((user) => (
        <ListUsers key={user.id} user={user} setReload={setReload}/>
      )): <div className="mt-5">
            <span className="text-xl"><b>No hay usuarios</b></span>
          </div>
    }
    </Box>
  )
}
