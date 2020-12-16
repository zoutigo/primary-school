import React from 'react'
import {useLocation} from 'react-router-dom'
import {makeStyles} from '@material-ui/styles'

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
        <div className={classes.root}>
            <h1> {designation}</h1>
        </div>
    )
}

export default Classroom
