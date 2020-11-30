import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/styles'
import {NavLink} from 'react-router-dom'
import {Button, Typography, Box} from '@material-ui/core'
import {openBurgerMenu} from '../../redux/settings/settingsActions'

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
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
        
    },
    text : {
        
        marginLeft: theme.spacing(3),
        
    },
    link : {
        color: theme.palette.common.white,
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

    const navElements = useSelector(state => state.settings.navElements)
    const burgerMenuIsOpened = useSelector(state => state.settings.burgerMenuIsOpened)
    const sideMenuStyle = burgerMenuIsOpened ? classes.hideMenu : classes.showMenu

    return (
        <div className={`${classes.root} ${sideMenuStyle}`}>
            {
                navElements.map((element, index)=>{
                    const {name, link} = element
                    if (element.alias !== 'home'){
                        return (
                            <Box variant='div' className={classes.box} key={index}>
                               
                                    <NavLink to={element.link} 
                                        onClick={()=> dispatch(openBurgerMenu())} 
                                        style={{  textDecoration: 'inherit'}}
                                        className={classes.link} 
                                        activeClassName={classes.active}
                                        >
                                        <span className={classes.text}> {name} </span> 
                                    </NavLink>
                            
                            </Box>
                            
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
