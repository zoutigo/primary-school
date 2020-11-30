import React from 'react'
import {makeStyles} from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme)=> ({
    root : {
        background: theme.palette.grey[800],
        width: '100vw',
        minHeight: '25vh',
        color: 'white'
    }
}))

function Footer() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant='h1'>
                Notre pied de page sera ici
            </Typography>
        </div>
    )
}

export default Footer
