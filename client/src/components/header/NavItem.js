import React , {useState} from 'react'
import {makeStyles} from '@material-ui/styles'
import {Box, Typography} from '@material-ui/core'

import {NavLink, useLocation} from 'react-router-dom'


import { useEffect } from 'react';


const useStyles = makeStyles((theme)=>({
   
    icon : {
        
        textAlign: 'center',
        marginTop: theme.spacing(2),
        color: 'white'
      
    },
    navLink : {
       marginRight: theme.spacing(1),
       marginLeft: theme.spacing(1),
       display: 'inline-block'
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
        textAlign:'center',
        background: 'green',
        color:'red'
    },
    link : {
        textAlign:'center',
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
   
        '&:hover':{
            // background:theme.palette.primary.main,
            '& >div':{
                display: 'block'
            }
        }
    },

    rootClicked: {
        maxWidth:'10em',
        minWidth: '5em',
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
        position: 'relative',
        display: 'block',
        minHeight: theme.spacing(5),
        borderTop: 'white solid 1px',
        '&:hover ': {
            background: theme.palette.success.light,
            color: theme.palette.error.main,
            '& div':{
                display:'inline-block',
            }
           
        },
        '& div':{
            display: 'none',
            background:'pink',
            position: 'absolute',
            top:0,
            left: '100%',
            minWidth:'15em',
            zIndex: 1,
            '& li':{
                display:'block',
                minHeight: '3em',
                background: theme.palette.third.dark,
                color:'black',
                borderTop: 'white solid 1px',
            },
            '& li:hover':{
                background: theme.palette.success.light,
                color: theme.palette.error.main,
            }
        },
    },
   
    
      
}))


function NavItem({rubric}) {
    const {name, link, icon, categories} = rubric

    const classes = useStyles()
    const location = useLocation()

    const [clicked, setClicked] = useState(false)

    const activeRoot = (link === location.pathname) ? classes.rootActive : classes.rootNotActive
    const activeIcon = (link === location.pathname) ? classes.iconActive : classes.iconNotActive
    const activeLine = (link === location.pathname) ? classes.lineActive : classes.lineNotActive
 
    const activeText = (link === location.pathname) ? classes.textActive : classes.textNotActive
   
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
           <div  className={`${wasClicked} ${activeRoot}`} style={{minHeight:'100%'}}>
                <nav
                 onClick = {()=> setClicked(true)}
                  >
                    <div className={`${classes.icon} ${activeIcon}`}> {icon} </div>
                    <div className ={classes.link} >
                        <NavLink 
                        to={{pathname: link, categories:categories, rubric:name}}
                        style={{ color: 'inherit', textDecoration: 'inherit'}} 
                        className={`${classes.navLink} ${activeText}}`}
                    
                        >
                            <Typography variant='h6' style={{marginLeft:'8px', marginRight:'8px'}}> {name} </Typography>
                        </NavLink>
                    </div>
                   
                    <div className={activeLine}></div>
                </nav>
                      
                             
                <div className={`${classes.dropdownContent} `} >
                   {
                       categories && categories.map((item, index)=>{
                           return (
                               <div 
                                    key={index} 
                                    className={`${classes.dropdownLink} `}
                                    
                                    onClick= {()=> setClicked(true)}
                                    >
                                    <NavLink  
                                        to= {{pathname:item.link, rubric:name, category:item.designation, subcategories:item.subcategories}}
                                        style={{ color: 'inherit', textDecoration: 'inherit'}}  >
                                        <Typography variant='h6' style={{marginLeft:'8px'}}> {item.designation} </Typography>
                                    </NavLink>
                                   <div >
                                       {/* <li>House</li>
                                       <li>Pen</li>
                                       <li>Car</li> */}
                                       {
                                          item.subcategories && item.subcategories.map((subcategory, ind)=>{
                                               return (
                                                   <li key={ind}>
                                                       <NavLink
                                                       style={{ color: 'inherit', textDecoration: 'inherit'}} 
                                                       to={
                                                           {pathname:subcategory.link,
                                                            subcategory:subcategory.designation,
                                                            
                                                        }
                                                           
                                                        }
                                                       >
                                                           <Typography variant='h6' style={{marginLeft:'8px', marginRight:'8px'}}> {subcategory.designation} </Typography>
                                                       </NavLink>
                                                   </li>
                                               )
                                           })
                                       }
                                   </div>

                               </div>
                           )
                       })
                   } 
                </div> 
                
                
        </div>
        
    )
}

export default NavItem
