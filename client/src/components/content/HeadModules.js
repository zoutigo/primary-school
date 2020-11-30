import React from 'react'
import {makeStyles} from '@material-ui/styles'

import image from '../../images/content2.jpg'

const useStyles = makeStyles((theme)=> ({
    root : {
        width: '100vw',
        minHeight: '35vh',
        backgroundSize: 'cover',
        background: `linear-gradient(to top, transparent 50%, green),
        url(${image})`,
        backgroundPosition: 'center'
    }
}))

function HeadModules() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            
        </div>
    )
}

export default HeadModules
