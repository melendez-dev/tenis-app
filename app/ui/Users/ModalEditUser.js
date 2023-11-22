"use client";

import { Box, Grid, TextField, Button, FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { enqueueSnackbar } from 'notistack'
import { successAlert } from "@/app/lib/utils";

export default function ModalEditUser({ user, setReload, setOpen }) {
  const { handleSubmit, control, formState: { errors }} = useForm();
  const [loading, setLoading] = useState(false)

  const onSubmit = async (values) => {
    try{
      setLoading(true)
      values["id"] = user?.id;
      const res = await fetch("/api/users", { method: "PUT", body: JSON.stringify(values) })
      const data = await res.json();

      if (data?.status === "success") {
        setReload(prev => !prev);
        setOpen(false);
        enqueueSnackbar("Se actualizó exitoxamente", successAlert);
      }
    }catch(err){
      console.error(err)
    }finally {
      setLoading(false);
    }
  }

  const onError = (e) => {
    console.error(e);
  }

  return (
    <Box className="p-4">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}> 
            <Controller 
              name="name"
              control={control}
              defaultValue={user?.name}
              render={({field}) => (
                <TextField
                  {...field}
                  name="name"
                  label="Nombre completo"
                  type="text"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors && errors.name && <FormHelperText error> {errors.name.message} </FormHelperText>}
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller 
              name="email"
              defaultValue={user?.email}
              control={control}
              render={({field}) => (
                <TextField
                  {...field}
                  name="name"
                  label="Correo electrónico"
                  type="email"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors && errors.email && <FormHelperText error> {errors.email.message} </FormHelperText>}
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" onClick={() => setOpen(false)} disabled={loading}>Cancelar</Button>
          </Grid>
          <Grid item xs={12} md={6}> 
            <Button variant="outlined" type="submit" disabled={loading}>Enviar</Button>
          </Grid>
        </Grid>

      </form>
    </Box>
  )
}
