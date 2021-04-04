import { Grid } from '@material-ui/core'
import React from 'react'
import { Controller } from 'react-hook-form'
import DatePickerControl from '../../../forms/DatePickerControl'
import InputTextControl from '../../../forms/InputTextControl'
import PageEditor from '../../../tinyEditors/PageEditor'

function EventsFields({ control, initialdatas }) {
  return (
    <Grid item container>
      <Grid item container>
        <InputTextControl
          name="title"
          control={control}
          initialvalue={initialdatas ? initialdatas.title : ''}
          helperText="au moins 10 caractères"
          label="Titrememnt"
          width="100%"
        />
      </Grid>
      <Grid item container>
        <InputTextControl
          name="place"
          control={control}
          initialvalue={
            initialdatas ? initialdatas.place : 'Ecole Saint Augustin'
          }
          helperText="au moins 10 caractères"
          label="Lieu de l'évènement"
          width="50%"
        />
      </Grid>
      <Grid item container>
        <DatePickerControl
          control={control}
          name="date"
          label="Date de l'évènement"
          format="dd Do MMMM yyyy"
          initialdate={initialdatas ? new Date(initialdatas.date) : new Date()}
        />
      </Grid>
      <Grid item container>
        <Controller
          name="text"
          control={control}
          defaultValue={initialdatas ? initialdatas.text : ''}
          render={({ onChange, value }) => (
            <PageEditor onChange={onChange} value={value} />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default EventsFields
