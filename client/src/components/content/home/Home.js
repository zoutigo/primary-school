import React from 'react'
import {Grid, makeStyles} from '@material-ui/core'

import Landing from './Landing'
import Introduction from './Introduction'
import Figures from './Figures'
import News from './News'
import Illustrations from './Illustrations'
import ContactForm from './ContactForm'

const useStyles = makeStyles((theme)=> ({
    root : {
       
    }
}))

function Home() {
    const classes = useStyles()
    return (
        <Grid container direction='column' className={classes.root}>
            <Grid item container>
                <Landing />
            </Grid>
            <Grid item container>
                <Introduction />
            </Grid>
            <Grid item container>
                <Figures />
            </Grid>
            <Grid item container>
                <News />
            </Grid>
            <Grid item container>
                <Illustrations />
            </Grid>
            <Grid item container>
                <ContactForm />
            </Grid>
        </Grid>
    )
}

export default Home
