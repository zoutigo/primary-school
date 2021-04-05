import {
  Box,
  Button,
  Grid,
  TextField,
  Checkbox,
  Input,
} from '@material-ui/core'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import DatePickerControl from '../../../forms/DatePickerControl'
import InputFileControl from '../../../forms/InputFileControl'

function FilesFields({ control, initialdatas, ...rest }) {
  const [attachment, setAttachment] = React.useState()

  const handleFile = (event) => {
    const files = Array.from(event.target.files)
    const [file] = files

    setAttachment(file[0])
  }
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
      {/* <Grid item container>
        <Controller
          control={control}
          name="file"
          value={attachment}
          render={(props) => (
            <input
              {...props}
              type="file"
              onChange={(e) => {
                handleFile(e)
                props.onChange(e.target.files.file[0])
              }}
              ref={props.ref}
            />
          )}
        />
     
      </Grid> */}
    </Grid>
  )
}

export default FilesFields
