"use client"

import { DataGrid, GridCellModes, gridClasses, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import * as React from "react"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { APIApplication, APIApplicationCommand } from "discord-api-types/v10"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 500 },
  { field: "options", headerName: "Options" },
]

export default function CommandTable({ rows }: { rows: APIApplicationCommand[] }) {
  rows[0].name
  return (
    <DataGrid
      sx={{
        [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
          outline: "transparent",
        },
        [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]: {
          outline: "none",
        },
      }}
      rowSelection={true}
      rows={rows}
      columns={columns}
      //   disableColumnSelector={true}
      //   disableDensitySelector={true}
      //   disableRowSelectionOnClick={true}
      //   disableVirtualization={true}
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
