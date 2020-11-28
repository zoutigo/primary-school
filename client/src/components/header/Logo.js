import React from 'react'
import logo from '../../images/logo.png'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme)=> ({
    root :{
        width: theme.spacing(10),
        height: theme.spacing(10)
    }
}))



function Logo() {
    const classes = useStyles()
    return (
      
            <img src={logo} alt='logo' className={classes.root} />
       
    )
}

export default Logo
