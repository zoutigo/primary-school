import { Grid } from '@material-ui/core'
import React from 'react'
import { Controller } from 'react-hook-form'
import PageEditor from '../../../tinyEditors/PageEditor'

function PagesFields({ control, initialdatas }) {
  return (
    <Grid item container>
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

export default PagesFields
