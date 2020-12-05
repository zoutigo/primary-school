import React , {useState} from 'react'
import {makeStyles, withStyles} from '@material-ui/styles'
import {Box, Button, Paper, Typography} from '@material-ui/core'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {NavLink, useLocation} from 'react-router-dom'

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { useEffect } from 'react';


const useStyles = makeStyles((theme)=>({
   
    icon : {
        
        textAlign: 'center',
        marginTop: theme.spacing(2),
        color: 'white'
      
    },
    navLink : {
       marginRight: theme.spacing(1),
       marginLeft: theme.spacing(1)
    },
    bottom : {

    },
    rootActive : {
        
    },
    rootNotActive :{

    },
    iconActive :{
        color: theme.palette.common.black,
        transform: 'scale(1.5)'
    },

    textActive : {
      
        color: theme.palette.success.main,
        
    },
    lineNotActive : {
        minHeight:'3px',
        minWidth:'2px',
        background:'transparent',
        
    },
    lineActive : {
        minHeight:'3px',
        minWidth:'2px',
        background:theme.palette.primary.main,
        // marginBottom: theme.spacing(3)
    },
    hoveredLink : {
        background: 'green',
        color:'red'
    },
    link : {
        background: 'transparent',
        '&:hover': {
            background: theme.palette.success.light,
            color:'red'
        }
    }
    ,
    hide : {
        display: 'none'
    },
    show : {
        display: 'block'
    },
    root: {
        maxWidth:'20em',
        overflow: 'hidden',
        '&:hover':{
            // background:theme.palette.primary.main,
            '& div':{
                display: 'block'
            }
        }
    },

    rootClicked: {
        maxWidth:'20em',
        overflow: 'hidden',
        '&:hover':{
            background:theme.palette.primary.main,
            // '& div':{
            //     display: 'none'
            // }
        }
    },
    
    
    dropdownContent :{
        display: 'none',
        position:'absolute',
        zIndex: 1,
        minWidth: '15em',
        background:theme.palette.primary.main,
      
    },
    dropdownLink : {
        minHeight: theme.spacing(5),
        borderTop: 'white solid 1px',
        '&:hover': {
            background: theme.palette.success.light,
            color:'red'
        }
    }
      
}))


function NavItem({element}) {
    const {name, link, icon, alias , sub} = element

    const classes = useStyles()
    const location = useLocation()

    const [hoverLink, setHoverLink] = useState(false)
    const [hover, setHover] = useState(false)
    const [clicked, setClicked] = useState(false)

    const activeRoot = (link === location.pathname) ? classes.rootActive : classes.rootNotActive
    const activeIcon = (link === location.pathname) ? classes.iconActive : classes.iconNotActive
    const activeLine = (link === location.pathname) ? classes.lineActive : classes.lineNotActive
 
    const activeText = (link === location.pathname) ? classes.textActive : classes.textNotActive
    const hoveredLink = hoverLink ? classes.hoveredLink : classes.link

    const showSubMenu = hover ? classes.show : classes.hide

    const wasClicked = clicked ? classes.rootClicked : classes.root 

    useEffect(() => {
        const handleClick = ()=>{
            setClicked(false)
        }
        window.addEventListener('mousemove', handleClick)
        return () => {
        window.removeEventListener('mousemove', handleClick)
        }
    }, [clicked])


    return (
           <div  className={`${wasClicked} ${activeRoot}`} style={{minHeight:'100%', background:'kaki'}}>
                <div
                 onClick = {()=> setClicked(true)}
                  >
                    <div className={`${classes.icon} ${activeIcon}`}> {icon} </div>
                    <div className ={classes.link}
                    
                    >
                        <NavLink 
                        to={{pathname: link, subrubrics:sub, rubric:name}}
                        style={{ color: 'inherit', textDecoration: 'inherit'}} 
                        className={`${classes.navLink} ${activeText}}`}
                    
                        >
                            <Typography variant='h6' style={{marginLeft:'8px', marginRight:'8px'}}> {name} </Typography>
                        </NavLink>
                    </div>
                   
                    <div className={activeLine}></div>
                </div>
                      
                             
                <Box className={`${classes.dropdownContent} `} >
                   {
                       sub && sub.map((item, index)=>{
                           return (
                               <div 
                                    key={index} 
                                    className={`${classes.dropdownLink} `}
                                  
                                    onClick= {()=> setClicked(true)}
                                    >
                                    <NavLink  
                                        to= {{pathname:item.link, rubric:name, subrubric:item.designation}}
                                        style={{ color: 'inherit', textDecoration: 'inherit'}}  >
                                        <Typography variant='h6' style={{marginLeft:'8px'}}> {item.designation} </Typography>
                                    </NavLink>

                               </div>
                           )
                       })
                   } 
                </Box> 
                
                
        </div>
        
    )
}

export default NavItem
