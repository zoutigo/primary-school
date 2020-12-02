import React , {useState} from 'react'
import {makeStyles} from '@material-ui/styles'
import {Button, Typography} from '@material-ui/core'
import {NavLink, useLocation} from 'react-router-dom'


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
        
    },
    submenu : {
        background : 'yellow'
    },
    hide : {
        display: 'none'
    },
    show : {
        display: 'block'
    },
    dropdown: {
        overflow: 'hidden',
        '&:hover':{
            background:'red',
            '& div':{
                display: 'block'
            }
        }
    },
    dropdownContent :{
    
        position:'absolute',
        zIndex: 1
    }
    
    
}))

function NavItem({name , icon , path, subitems}) {
    const classes = useStyles()
    const location = useLocation()

    const [hover, setHover] = useState(false)

    const activeRoot = (path === location.pathname) ? classes.rootActive : classes.rootNotActive
    const activeIcon = (path === location.pathname) ? classes.iconActive : classes.iconNotActive
    const activeBottom = (path === location.pathname) ? classes.bottomActive : classes.bottomNotActive
    const activeText = (path === location.pathname) ? classes.textActive : classes.textNotActive

    const showSubMenu = hover ? classes.show : classes.hide


    return (
        <div  className={classes.dropdown}>
                <div
                className={`${classes.root} ${activeRoot}`}
                onMouseOver = {()=> setHover(true)}
                onMouseOut = { ()=> setHover(false)}
               
                >
                    <div className={`${classes.icon} ${activeIcon}`}> {icon} </div>
                    <div className={classes.textbox}> 
                        <Typography variant='h6' className={activeText}> {name} </Typography>
                    </div>
                    <div className={activeBottom}> </div>
                </div>
             
                <div className={`${classes.dropdownContent} ${showSubMenu}`} >
                   {
                       subitems && subitems.map((item, index)=>{
                           return (
                               <NavLink key={index} to={item.link} >
                                   <div> {item.designation} </div>
                               </NavLink>
                           )
                       })
                   }
                </div>
                
                
        </div>
        
    )
}

export default NavItem
