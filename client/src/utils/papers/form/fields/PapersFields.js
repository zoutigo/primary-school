import { Grid } from '@material-ui/core'
import React from 'react'
import { Controller } from 'react-hook-form'
import InputTextControl from '../../../forms/InputTextControl'
import PageEditor from '../../../tinyEditors/PageEditor'

function PapersFields({ control, initialdatas }) {
  return (
    <Grid item container>
      <Grid item container>
        <InputTextControl
          name="title"
          control={control}
          initialvalue={initialdatas ? initialdatas.title : ''}
          helperText="au moins 10 caractères"
          label="Titre"
          width="100%"
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

export default PapersFields
