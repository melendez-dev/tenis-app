"use client"

import { Box, Typography, TextField, Button, Grid, FormHelperText, FormControl, Select, InputLabel, MenuItem } from "@mui/material"
import { Controller } from "react-hook-form"
import { city } from "@/app/lib/utils"
import { DatePicker } from "@mui/x-date-pickers";

export default function CreateDetailAccordion({
  handleSubmit, 
  control,
  errors,
  onSubmit,
  onError,
  loading
}) {
  return (
    <Box>
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
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Nombre del torneo" onChange={(e) => field.onChange(e.target.value)}/>
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
              defaultValue={1}
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
              defaultValue={new Date()}
              render={({ field: { onChange, onBlur, value} }) => (
                <DatePicker
                  label="Inicio del torneo"
                  defaultValue={new Date()}
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
              defaultValue={new Date()}
              render={({ field: { onChange, onBlur, value} }) => (
                <DatePicker 
                  defaultValue={new Date()}
                  label="Fin del torneo"
                  selected={value} 
                  onChange={onChange} 
                  onBlur={onBlur}
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
              defaultValue={0}
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth type="number" label="Finaciamiento" onChange={(e) => field.onChange(e.target.value)}/>
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
              defaultValue={16}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  type="number" 
                  label="# Máximo de usuarios" 
                  InputProps={{ inputProps: { min: 2, max: 120 } }}
                  onChange={(e) => field.onChange(e.target.value)}
                  fullWidth
                />
              )}
            />
            {errors && errors.max_users && <FormHelperText error> {errors.max_users.message}</FormHelperText>}

          </Grid>
          <Grid item xs={0} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <Button type="submit" variant="outlined" disabled={loading}>
              <Typography> enviar </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
