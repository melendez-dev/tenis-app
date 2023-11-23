"use client";

import {Box, Typography} from "@mui/material";

export default function SummaryTournament({ tournament }) {
  return (
    <Box>
      <Typography className="text-gray-700">{tournament?.name}</Typography>
    </Box>
  )
}
