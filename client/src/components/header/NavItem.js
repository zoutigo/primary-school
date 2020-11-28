import React from 'react'
import {makeStyles} from '@material-ui/styles'
import {Typography} from '@material-ui/core'

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

    }
    
}))

function NavItem({name, link, icon}) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
          <div className={classes.icon}> {icon} </div>
          <div className={classes.text}> 
             <Typography variant='h6'> {name} </Typography>
          </div>
          <div className={classes.bottom}> </div>
    
        </div>
    )
}

export default NavItem
