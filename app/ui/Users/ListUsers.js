"use client"

import { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material"
import ModalCustom from "../Shared/ModalCustom";
import ModalEditUser from "./ModalEditUser";

export default function ListUsers({ user, setReload }) {

  const [open, setOpen] = useState(false);

  return (
    <Box className="mt-2 border-2 rounded-lg p-3">
      <ModalCustom 
        open={open}
        setOpen={setOpen}
        title="Editar Usuario"
        body={ <ModalEditUser user={user} setReload={setReload} setOpen={setOpen} /> }
      />
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={6} md={4}>
          <Typography>{user?.name}</Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography>{user?.email}</Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button onClick={() => setOpen(true)}>Editar</Button>
        </Grid>
      </Grid>
    </Box>
  )
}
