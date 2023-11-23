"use client";

import NextAuthProvider from '@/app/lib/NextAuthProvider'
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export default function Providers({ children }) {
  return (
    <>
      <NextAuthProvider>
        <SnackbarProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {children}
          </LocalizationProvider>
        </SnackbarProvider>
      </NextAuthProvider> 
    </>
  )
}
