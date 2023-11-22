"use client";

import { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material"
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { city, formatCurrency } from "@/app/lib/utils";
import ModalCustom from "@/app/ui/Shared/ModalCustom";
import ModalEditTournament from "./ModalEditTournament";

export default function DetailTournament({ tournament, setReload }) {
  const [open, setOpen] = useState(false)

  const deleteTourment = async (id) => {
    const dataToSend = { id };
    const res = await fetch("/api/tournaments", {
      method: "DELETE",
      body: JSON.stringify(dataToSend) 
    })

    const data = await res.json();

    if (data.status === "error") {
      setReload(prev => prev)
      // todo alert
    }else {
      setReload(prev => !prev)
    }
  }
  return (
    <Box>
      <ModalCustom 
        open={open}
        setOpen={setOpen}
        title="EDITAR TORNEO"
        body={ <ModalEditTournament setOpen={setOpen} tournament={tournament} setReload={setReload} />}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Box><Typography className="text-gray-500">INICIO TORNEO</Typography></Box>
          <Box><Typography>{format(new Date(tournament?.start_date), 'dd MMMM YYY', {locale: es})}</Typography></Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box><Typography className="text-gray-500">FIN TORNEO</Typography></Box>
          <Box><Typography>{format(new Date(tournament?.end_date), 'dd MMMM YYY', {locale: es})}</Typography></Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box><Typography className="text-gray-500">CIUDAD</Typography></Box>
          <Box><Typography>{city[tournament?.city - 1]?.name}</Typography></Box>

        </Grid>
        <Grid item xs={12} md={6}>
          <Box><Typography className="text-gray-500">FINANCIAMIENTO</Typography></Box>
          <Box><Typography>{formatCurrency(tournament?.total_money)}</Typography></Box>

        </Grid>
        <Grid item xs={12} md={6}>
          <Box><Typography className="text-gray-500"># MAX USUARIOS</Typography></Box>
          <Box><Typography>{tournament?.max_users}</Typography></Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="flex gap-3">
            <Button onClick={() => deleteTourment(tournament?.id)} ><span className="text-red-500">Eliminar</span></Button>
            <Button onClick={() => setOpen(true)} variant="outlined">editar</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
