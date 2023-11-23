"use client";

import { useState, useEffect } from "react"
import Image from "next/image"
import bg from "@/public/tournamentuser.png"
import backarrow from "@/public/backarrow.svg"
import Link from "next/link"
import Loading from "@/app/ui/Shared/Loading";
import { city, formatCurrency } from "@/app/lib/utils";
import format from "date-fns/format";
import { es } from "date-fns/locale"
import {Grid, Box, Button} from "@mui/material"
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from 'notistack'
import { successAlert, errorAlert } from "@/app/lib/utils";

export default function PageIdTournament({params}) {

  const session = useSession();

  const [tournament, setTournament] = useState({});
  const [players, setPlayers] = useState([]);
  const [disabled, setDisabled] = useState(false)
  const [playersLoading, setPlayersLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [isRegister, setIsRegister] = useState(false)

  const getData = async() => {
    try{
      const res = await fetch(`/api/users/tournaments/by-id?id=${params.id}`)
      const data = await res.json();

      if (data?.status === "success" && data?.data.length === 1) {
        setTournament(data?.data[0])
      }
      setLoading(true)
    }catch(err){
      console.error(err)
    }finally {
      setLoading(false)
    }
  }

  const getPlayers = async() => {
    try{
      setLoading(true)
      setPlayersLoading(true)
      const res = await fetch(`/api/tournaments_users?id=${params?.id}`);
      const data = await res.json();
      setPlayers(data?.data)
    }catch(err) {
      console.error(err)
    } finally {
      setLoading(false)
      setPlayersLoading(false)
    }
  }

  const getInTournament = async() => {
    try{
      let email = null;

      if (session?.status === "authenticated") {
        email = session?.data?.user?.email;
      }

      if ((tournament?.end_date && tournament?.start_date) && new Date(tournament?.start_date) < new Date()) {
        enqueueSnackbar("La fecha inical del torneo es menor que la de inscripción", errorAlert)
        return
      }

      if(players && tournament?.max_users >= players?.length) {
        enqueueSnackbar("Maximo usuarios por torneo", errorAlert)
        return
      }

      setDisabled(true)

      const dataToSend = {
        tournament_id: params?.id,
        email: email,
        name: tournament?.name,
      }

      const res = await fetch("/api/tournaments_users", {
        method: "POST",
        body: JSON.stringify(dataToSend)
      });
      const data = await res.json();

      if (data?.status === "success") {
        enqueueSnackbar("se ha inscripto exitosamente", successAlert);
        setReload(prev => !prev);
      }
    }catch(err) {
      console.error(err)
    }finally {
      setDisabled(false)
    }
  }

  useEffect(() => {
    getPlayers();
  }, [reload, params])

  useEffect(() => {
    getData();
  }, [params.id ])

  useEffect(() => {
    if (session?.status === "authenticated" && players) {
      const boolPlayer = players.some((player) => player?.email == session?.data?.user?.email)
      setIsRegister(boolPlayer);
    }
  }, [session, players])

  return (
    <Box>
      <Image src={bg} alt="background" width="1512" height="350"/>
      <Box>
        <Box className="mt-1 p-8 flex gap-3 items-center">
          <Link href="/user">
            <Button variant="contained">
              <Image src={backarrow} alt="back" width={20} height={30}/>
            </Button>
          </Link>
          <Button variant="outlined" disabled={disabled || isRegister || loading} onClick={() => getInTournament()}>{isRegister ? "ya te encuentras inscrito" : "Incribirse"}</Button>
        </Box>
        <Box className="mt-2 p-8">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <p className="text-md">Nombre del torneo</p>
              <p className="text-md text-grat-500"><b>{tournament?.name}</b></p>
              <Box>
                <span className="text-gray-400 text-xs">{tournament?.start_date && format(new Date(tournament?.start_date), 'dd MMM YYY', {locale: es})}</span>
                <span className="text-gray-400 text-xs"> - </span>
                <span className="text-gray-400 text-xs">{tournament?.end_date && format(new Date(tournament?.end_date), 'dd MMM YYY', {locale: es})}</span>

              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <p className="text-md">Ciudad del torneo</p>
              <p className="text-md text-gray-500">{tournament?.city && city[tournament?.city - 1]?.name}</p>
            </Grid>
            <Grid item xs={12} md={3}>
              <p className="text-md">Finaciamiento total</p>
              <p className="text-md text-gray-500"><b>$ {tournament?.total_money && formatCurrency(tournament?.total_money)}</b></p>
            </Grid>
            <Grid item xs={12} md={3}>
              <p className="text-md">Número max de jugadores</p>
              <p className="text-md text-gray-500">{tournament?.max_users && tournament?.max_users} jugadores</p>
            </Grid>
          </Grid>
        </Box>
        <Box className="mt-3 p-8">
          Jugadores inscriptos:
          <Box>
            {playersLoading ? <Loading /> 
            : players?.length ? players?.map((player, key) => (
              <Box key={key}>
                  {player?.email}
              </Box>
            )): <Box>No hay jugadores inscriptos en este torneo</Box>}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
