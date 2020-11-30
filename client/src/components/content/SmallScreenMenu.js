import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/styles'
import {NavLink} from 'react-router-dom'
import {Button, Typography} from '@material-ui/core'
import {openBurgerMenu} from '../../redux/settings/settingsActions'

const useStyles = makeStyles((theme)=>({
    root : {
        width: '100%',
        minWidth: '100vw',
        minHeight: '100vh',
        zIndex: 2 ,
        backgroundColor: theme.palette.grey[600],
        position: 'absolute',
        top: '4em',
        // transform: 'translate(0, -200%)'
    },
    navElement : {

    },
    hideMenu : {
        transform: 'translateY(-200%)',
        transition: 'transform 0.5s ease'
    },
    showMenu : {
        transform: 'translateY(0)',
        transition: 'transform 0.5s ease',
        zIndex: '5' 
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
                
                    return (
                        <Typography key={index} className={classes.navElement}>
                            <NavLink to={element.link} 
                            onClick={()=> dispatch(openBurgerMenu())} 
                            className={classes.navLink} 
                            activeStyle={{ color: 'red' }} 
                            >
                            {name} 
                            </NavLink>
                         </Typography>
                     )
                       
                    
                })
            }
            
        </div>
    )
}

export default  SmallScreenMenu
