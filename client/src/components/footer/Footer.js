import React from 'react'
import {makeStyles} from '@material-ui/styles'
import { Grid} from '@material-ui/core'
import Contact from './Contact'
import LatestInfos from './LatestInfos'
import Timing from './Timing'

const useStyles = makeStyles((theme)=> ({
    root : {
        background: theme.palette.grey[800],
        width: '98vw',
        minHeight: '25vh',
        color: 'white'
    }
}))

function Footer() {
    const classes = useStyles()

  
    return (         
        <Grid container className={classes.root} >
          <Grid item  sm={12} md={3}> <Contact /> </Grid>
          <Grid item sm={12} md={3} > <Timing /> </Grid>
          <Grid item sm={12} md={3} > <LatestInfos /> </Grid>
        </Grid>

    );
    
}

export default Footer
