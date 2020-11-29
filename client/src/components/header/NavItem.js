import React from 'react'
import {makeStyles} from '@material-ui/styles'
import {Typography} from '@material-ui/core'
import {useLocation} from 'react-router-dom'

const useStyles = makeStyles((theme)=>({
    root :{
        boxShadow: 'none',
        height: '100%',
        paddingTop: theme.spacing(1)
    },
    icon : {
        
        textAlign: 'center',
      
    },
    text : {
       
    },
    bottom : {

    },
    rootActive : {
        background : theme.palette.warning.main
    },
    notactive :{

    }
    
}))

function NavItem({name , icon , path}) {
    const classes = useStyles()
    const location = useLocation()

    const activeRoot = (path === location.pathname) ? classes.rootActive : classes.notactive
  
    return (
        <div className={`${classes.root} ${activeRoot}`}>
          <div className={classes.icon}> {icon} </div>
          <div className={classes.text}> 
             <Typography variant='h6'> {name} </Typography>
          </div>
          <div className={classes.bottom}> </div>
    
        </div>
    )
}

export default NavItem
