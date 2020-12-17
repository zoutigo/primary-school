import { Typography } from '@material-ui/core'
import React from 'react'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme)=>({
    root:{
        background: theme.palette.third.main,
        minWidth:'100%'
    }
}))

function Introduction() {
    const classes = useStyles()
    return (
        <div style={{minHeight:'10vh'}} className={classes.root}>

        <Typography variant='h2'>
        Bienvenue sur le site de l'école St Augustin de Crémieu.
        </Typography>
        </div>
    )
}

export default Introduction
