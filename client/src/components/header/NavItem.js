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
    textbox : {
       marginRight: theme.spacing(1),
       marginLeft: theme.spacing(1)
    },
    bottom : {

    },
    rootActive : {
        background: 'yellow',
    },
    rootNotActive :{

    },
    iconActive :{
        color: theme.palette.common.white,
        transform: 'scale(1.5)'
    },
    bottomActive: {
        width: '100%',
        height: '3px',
        background: theme.palette.common.white,
    },
    textActive : {
      
        color: theme.palette.success.main,
        
    }
    
}))

function NavItem({name , icon , path}) {
    const classes = useStyles()
    const location = useLocation()

    const activeRoot = (path === location.pathname) ? classes.rootActive : classes.rootNotActive
    const activeIcon = (path === location.pathname) ? classes.iconActive : classes.iconNotActive
    const activeBottom = (path === location.pathname) ? classes.bottomActive : classes.bottomNotActive
    const activeText = (path === location.pathname) ? classes.textActive : classes.textNotActive
  
    return (
        <div className={`${classes.root} ${activeRoot}`}>
          <div className={`${classes.icon} ${activeIcon}`}> {icon} </div>
          <div className={classes.textbox}> 
             <Typography variant='h6' className={activeText}> {name} </Typography>
          </div>
          <div className={activeBottom}> </div>
    
        </div>
    )
}

export default NavItem
