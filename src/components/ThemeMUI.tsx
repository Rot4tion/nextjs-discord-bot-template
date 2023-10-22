"use client"

import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

export default function ThemeMUI({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
      {children}
    </ThemeProvider>
  )
}
