"use client";

import { useState } from "react";
import  ControlledAccordions  from "@/app/ui/Shared/Accordion";
import CreateDetailAccordion from "@/app/ui/Tournaments/CreateDetailAccordion";
import CreateSummaryAccordion from "@/app/ui/Tournaments/CreateSummaryAccordion";
import { useForm } from "react-hook-form"
import { enqueueSnackbar } from 'notistack'
import { successAlert, errorAlert } from "@/app/lib/utils";

export default function CreateTourment({ setReload }) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, formState: { errors }, resetField } = useForm();

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSubmit = async(values) => {
    try {
      setLoading(true);
      values["start_date"] = values["start_date"] ?? new Date();
      values["end_date"] = values["end_date"] ?? new Date();

      if (values?.start_date > values?.end_date) {
        enqueueSnackbar("La fecha de inicio no puede ser mayor que la de fin", errorAlert);
        return
      }

      const res =  await fetch("/api/tournaments", {method: 'POST', body: JSON.stringify(values) });
      const data = await res.json();

      if (data.status === "success") {
        resetField("name")
        resetField("city")
        resetField("start_date")
        resetField("end_date")
        resetField("total_money")
        resetField("max_users")
        setExpanded(false)
        setReload((prev) => !prev);
        enqueueSnackbar("Se ha creado exitosamente", successAlert);
      }
    }catch(err) {
      console.error(err)
    }finally {
      setLoading(false)
    }
  }

  const onError = (e) => {
    console.log(e)
  }

  return (
    <>
      <ControlledAccordions 
        summary={<CreateSummaryAccordion />}
        details={
          <CreateDetailAccordion
            handleSubmit={handleSubmit}
            control={control}
            errors={errors}
            onSubmit={onSubmit}
            onError={onError}
            loading={loading}
          />
        }
        handleChange={handleChange}
        expanded={expanded}
      />

    </>
  )
}
