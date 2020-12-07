import React from 'react'
import {makeStyles, Typography} from '@material-ui/core'

import image from '../../../images/content.jpg'


const useStyles = makeStyles((theme)=> ({
    root : {
        width: '100vw',
        minHeight: '100vh',
        backgroundSize: 'cover',
        background: `linear-gradient(to top, transparent 80%, green),
        url(${image})`
    },
    welcome : {
        marginTop: '3em',
        textAlign:'center',
        color: 'white'
    }
}))

function Landing() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant='h1' className={classes.welcome}>
                Welcome Messages
            </Typography>
            
        </div>
    )
}

export default Landing
