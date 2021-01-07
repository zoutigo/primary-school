import React from 'react'

import { makeStyles } from '@material-ui/styles'
import TitlePanel from '../../../utils/TitlePanel'
import TinyEditor from './TinyEditor'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: '0px auto',
  },
  titleBackground: {
    background: 'orange',
  },
}))
function PaperForm() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TitlePanel
        title={`Publier une nouvelle actualité`}
        background={classes.titleBackground}
      />
      <TinyEditor />
    </div>
  )
}

export default PaperForm
