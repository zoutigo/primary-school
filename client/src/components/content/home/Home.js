import React from 'react'
import {makeStyles} from '@material-ui/core'

import image from '../../../images/content.jpg'

const useStyles = makeStyles((theme)=> ({
    root : {
        width: '100vw',
        minHeight: '100vh',
        backgroundSize: 'cover',
        background: `linear-gradient(to top, transparent 80%, green),
        url(${image})`
    }
}))

function Home() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            Here is the home 
        </div>
    )
}

export default Home
