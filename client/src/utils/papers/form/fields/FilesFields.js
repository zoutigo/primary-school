import { Grid } from '@material-ui/core'
import React from 'react'
import DatePickerControl from '../../../forms/DatePickerControl'
import InputFileControl from '../../../forms/InputFileControl'

function FilesFields({ control, initialdatas }) {
  return (
    <Grid item container>
      <Grid item container>
        <DatePickerControl
          control={control}
          name="month"
          views={['year', 'month']}
          label="Mois"
          format="MMMM yyyy"
          initialdate={initialdatas ? new Date(initialdatas.month) : new Date()}
        />
      </Grid>
      <Grid item container>
        <InputFileControl
          name="file"
          control={control}
          helperText="au moins 10 caractères"
          label="Upload du fichier"
          width="100%"
          defaulValue=""
        />
      </Grid>
    </Grid>
  )
}

export default FilesFields
