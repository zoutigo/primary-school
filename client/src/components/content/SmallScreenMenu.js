import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/styles'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import {NavLink} from 'react-router-dom'
import {Button, Typography, Box, IconButton} from '@material-ui/core'
import {openBurgerMenu} from '../../redux/settings/settingsActions'


import SmallScreenMenuItem from './SmallScreenMenuItem'

import {openSubMenu} from '../../redux/settings/settingsActions'

const useStyles = makeStyles((theme)=>({
    root : {
        width: '100%',
        minWidth: '100vw',
       
        zIndex: 2 ,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        top: '4em',
        transform: 'translate(0, -200%)'
    },
    box : {
        background: theme.palette.error.light,
        margin: '3px',
          
    },
    text : {
        
        marginLeft: theme.spacing(3),
        
    },
    link : {
        flexGrow: 1 ,
        paddingLeft: theme.spacing(2)
       
    },
    button : {
        background: theme.palette.warning.light,
        width: '99%',
        margin: '3px'
    },
    hideMenu : {
        transform: 'translateY(-200%)',
        transition: 'transform 0.5s ease'
    },
    showMenu : {
        transform: 'translateY(0)',
        transition: 'transform 0.5s ease',
        zIndex: '5' 
    },
    active : {
        color: theme.palette.warning.light
    }

}))


function SmallScreenMenu() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const rubrics = useSelector(state => state.settings.rubrics)
    const burgerMenuIsOpened = useSelector(state => state.settings.burgerMenuIsOpened)
    const sideMenuStyle = burgerMenuIsOpened ? classes.hideMenu : classes.showMenu

    const toogleSubMenu = (ind)=> dispatch(openSubMenu(ind))
    const toogleBurgerMenu = () => dispatch(openBurgerMenu())

    return (
        <div className={`${classes.root} ${sideMenuStyle}`}>
            {
                rubrics.map((element, index)=>{
                    const {name, link, categories} = element
                   
                    if (element.alias !== 'home'){

                        return (
                            <div key={index}>
                            <div className={classes.box}  style={{display:'flex', alignItems:'center', height:'3rem'}}>
                                    
                                       <div  className={classes.link} >
                                             <NavLink to={{pathname:link, categories:categories, rubric:name}}
                                                onClick={toogleBurgerMenu} 
                                                style={{ color: 'inherit', textDecoration: 'inherit'}} 
                                                
                                                activeClassName={classes.active}
                                                >
                                                <Typography variant='h6'> {name} </Typography>
                                             
                                            </NavLink>
                                       </div>
                                       {
                                           categories &&
                                           <div style={{width:'20%', borderLeft:'white solid 1px', textAlign:'center' }}>
                                           <span onClick={()=> toogleSubMenu(index)}>
                                               <IconButton>
                                                   <KeyboardArrowDownIcon />
                                               </IconButton>
                                           </span>
                                        </div>
                                       } 
                                        
                                  
                            </div>
                            {
                            
                            element.subdisplay && element.categories && 
                            <SmallScreenMenuItem categories={categories} index={index} toogleSubMenu={toogleSubMenu} toogleBurgerMenu={toogleBurgerMenu} rubric={element.name} />
                           
                            }
                            </div>
                            
                            
                         )
                    }
                    return null
                       
                })
            }
             <Button 
             variant='outlined'  
             className={classes.button}
             onClick={()=> dispatch(openBurgerMenu())} 
             >
                Fermer cette fenetre
             </Button>
            
        </div>
    )
}

export default  SmallScreenMenu
