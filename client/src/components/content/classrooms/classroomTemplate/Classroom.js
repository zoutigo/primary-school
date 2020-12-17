import React from 'react'
import {useLocation} from 'react-router-dom'
import {makeStyles} from '@material-ui/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    root: {
        minwidth: '100vw',
        minHeight: '100vh',
        textAlign:'center'
    }
}))

function Classroom() {
    const classes = useStyles()
    const {designation} = useLocation()
 
    return (
        // <div className={classes.root}>
        //     <h1> Je suis dans une classe</h1>
        // </div>
        <Grid container className={classes.root}>
            <Grid item container>
                <Grid item>Image</Grid>
                <Grid item>infos</Grid>
            </Grid>
            <Grid item container> Text</Grid>
            <Grid item container> Buttons</Grid>
        </Grid>
    )
}

export default Classroom
