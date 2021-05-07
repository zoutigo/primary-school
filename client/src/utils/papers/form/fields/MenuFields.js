import { Grid, Input } from '@material-ui/core'
import React from 'react'
import { Controller } from 'react-hook-form'
import DatePickerControl from '../../../forms/DatePickerControl'

function MenuFields({ control, initialdatas, ...rest }) {
  const handleChange = (e) => {
    console.log(e.target.files)
  }

  return (
    <Grid item container>
      <Grid item xs={6} lg={4}>
        <DatePickerControl
          control={control}
          name="startdate"
          label="Date de debut"
          format="dddd DD MMMM yyyy"
          initialdate={initialdatas ? new Date(initialdatas.date) : new Date()}
        />
      </Grid>

      <Grid item xs={6} lg={4}>
        <DatePickerControl
          control={control}
          name="enddate"
          label="Date de fin"
          format="dddd DD MMMM yyyy"
          initialdate={initialdatas ? new Date(initialdatas.date) : new Date()}
        />
      </Grid>
      <Grid item xs={6} lg={4}>
        <Controller
          control={control}
          name="file"
          render={({ onChange }) => (
            <input
              id="input-menu-upload"
              type="file"
              onChange={(e) => onChange(e.target.files[0])}
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default MenuFields
