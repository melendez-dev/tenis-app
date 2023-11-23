"use client";

import { Controller, useForm } from "react-hook-form";
import { Box, Typography, TextField, Button, Grid, FormHelperText, FormControl, Select, InputLabel, MenuItem } from "@mui/material"
import { city } from "@/app/lib/utils"
import { DatePicker } from "@mui/x-date-pickers";
import { enqueueSnackbar } from 'notistack'
import { successAlert, errorAlert } from "@/app/lib/utils";

export default function ModalEditTournament({ setOpen, tournament, setReload }) {
  const { control, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async (values) => {

    values["id"] = tournament?.id;

    if (values?.start_date > values?.end_date) {
      enqueueSnackbar("La fecha de inicio no puede ser mayor que la de fin", errorAlert);
      return
    }

    try{
      const res = await fetch("/api/tournaments", {
        method: "PUT",
        body: JSON.stringify(values)
      })
      const data = await res.json();

      if (data?.status === "success") {
        enqueueSnackbar("Se ha editado correctamente", successAlert);
        setReload(prev => !prev);
        setOpen(false);
      }
    }catch(err){
      console.error(err)
    }
  }

  const onError = (err) => {
    console.log(err)

  }
  return (
    <Box className="p-8">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller 
              name="name"
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              defaultValue={tournament?.name}
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Nombre del torneo" fullWidth onChange={(e) => field.onChange(e.target.value)}/>
              )}
            />
            {errors && errors.name && <FormHelperText error> {errors.name.message}</FormHelperText>}
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller 
              name="city"
              rules={{
                required : {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              defaultValue={tournament?.city}
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="city">Ciudad</InputLabel>
                  <Select
                    {...field}
                    labelId="city"
                    id="city"
                    label="ciudad"
                    onChange={(e) => {field.onChange(e.target.value)}}
                  >
                    {city.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
              )}
            />
            {errors && errors.city && <FormHelperText error> {errors.city.message}</FormHelperText>}
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller 
              name="start_date"
              control={control}
              defaultValue={new Date(tournament.start_date)}
              render={({ field: { onChange, onBlur, value} }) => (
                <DatePicker
                  fullWidth
                  defaultValue={new Date(tournament.start_date)}
                  label="Inicio del torneo"
                  selected={value} 
                  onChange={onChange} 
                  onBlur={onBlur}
                />
              )}
            />
            {errors && errors.start_date && <FormHelperText error> {errors.start_date.message}</FormHelperText>}

          </Grid>
          <Grid item xs={12} md={6}>
            <Controller 
              name="end_date"
              control={control}
              defaultValue={new Date(tournament.end_date)}
              render={({ field: { onChange, onBlur, value} }) => (
                <DatePicker 
                  defaultValue={new Date(tournament.end_date)}
                  label="Fin del torneo"
                  selected={value} 
                  onChange={onChange} 
                  onBlur={onBlur}
                  wrapperClassName="p-4"
                />
              )}
            />
            {errors && errors.end_date && <FormHelperText error> {errors.end_date.message}</FormHelperText>}

          </Grid>
          <Grid item xs={12} md={6}>
            <Controller 
              name="total_money"
              rules={{
                required : {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              defaultValue={tournament?.total_money}
              control={control}
              render={({ field }) => (
                <TextField fullWidth {...field} type="number" label="Finaciamiento" onChange={(e) => field.onChange(e.target.value)}/>
              )}
            />
            {errors && errors.total_money && <FormHelperText error> {errors.total_money.message}</FormHelperText>}

          </Grid>
          <Grid item xs={12} md={6}>
            <Controller 
              name="max_users"
              rules={{
                required : {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              control={control}
              defaultValue={tournament?.max_users}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  type="number" 
                  label="# Máximo de usuarios" 
                  fullWidth
                  InputProps={{ inputProps: { min: 2, max: 120 } }}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors && errors.max_users && <FormHelperText error> {errors.max_users.message}</FormHelperText>}

          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" onClick={() => setOpen(false)}>
              <Typography> cancelar </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button type="submit" variant="outlined">
              <Typography> enviar </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>

  )
}
