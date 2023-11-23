import { Grid, Box, Typography } from "@mui/material";
import { city, formatCurrency } from "@/app/lib/utils";
import format from "date-fns/format";
import { es } from "date-fns/locale"
import Link from "next/link";

export default function DetailTournamentViewUser({tournament}) {
  return (
    <Box>
      {tournament.map((item) => (
        <Box key={item?.id} className="border p-2 rounded mt-4 hover:bg-sky-200">
          <Link href={"/user/[id]" + item?.id} as={"/user/" + item?.id}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography className="text-md">{item?.name}</Typography>
              </Box>
              <Box>
                <Typography className="text-md text-gray-400">{city[item?.city - 1]?.name}</Typography>
              </Box>
              <Box>
                <span className="text-gray-400 text-xs">{format(new Date(item?.start_date), 'dd MMM YYY', {locale: es})}</span>
                <span className="text-gray-400 text-xs"> - </span>
                <span className="text-gray-400 text-xs">{format(new Date(item?.end_date), 'dd MMM YYY', {locale: es})}</span>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography className="text-md">Finaciamiento Total</Typography>
              </Box>
              <Box>
                <Typography className="text-md text-gray-400">{formatCurrency(item?.total_money)}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography className="text-md">Usuarios Maximo</Typography>
              </Box>
              <Box>
                <Typography className="text-md text-gray-400">{item?.max_users}</Typography>
              </Box>
            </Grid>
          </Grid>

          </Link>
        </Box>
      ))}
    </Box>
  )
}
