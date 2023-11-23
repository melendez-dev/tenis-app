'use client';

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import  ControlledAccordions  from "@/app/ui/Shared/Accordion";
import DetailTournament from "@/app/ui/Tournaments/DetailTournament";
import SummaryTournament from "@/app/ui/Tournaments/SummaryTournament";
import Loading from "@/app/ui/Shared/Loading";

export default function ListTourments({ filter = "", reload, setReload }) {

  const [tournaments, setTournaments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getData = async() => {
    setLoading(true)
    await fetch(`/api/tournaments?filter=${filter}`)
    .then((res) => res.json())
    .then(data => {
      const { rows } = data?.data;
      setTournaments(rows)
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
   getData()
  }, [filter, reload])

  return (
    <Box>
      {loading ? <Box className="mt-4"><Loading /></Box> : tournaments?.length ? tournaments.map((tournament, key) => (
        <Box key={key} className="mt-5">
          <ControlledAccordions
            summary={<SummaryTournament tournament={tournament}/>}
            details={<DetailTournament tournament={tournament} setReload={setReload}/>}
            handleChange={handleChange}
            expanded={expanded}
            panel={tournament?.name}
          />
        </Box>
      )): <Box className="mt-4"><span className="text-xl"><b>No hay torneo</b></span></Box>}
    </Box>
  )
}



