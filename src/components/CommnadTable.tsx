"use client"

import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid"
import * as React from "react"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { APIApplicationCommand } from "discord-api-types/v10"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 500 },
  {
    field: "options",
    headerName: "Options",
    renderCell(x) {
      return x.value?.length || 0
    },
  },
]

export default function CommandTable({ rows }: { rows: APIApplicationCommand[] }) {
  return (
    <DataGrid
      //Disable cell outline
      sx={{
        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
          outline: "none",
        },
        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
          outline: "none",
        },
      }}
      rowSelection={true}
      rows={rows}
      columns={columns}
      hideFooter
      //   initialState={{
      //     pagination: {
      //       paginationModel: { page: 0, pageSize: 5 },
      //     },
      //   }}
      //   pageSizeOptions={[5, 10]}
    />
  )
}
