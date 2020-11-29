import React from 'react'
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'

import {makeStyles} from '@material-ui/styles'
import {Box} from '@material-ui/core'

import NavItem from './NavItem'

const useStyles = makeStyles((theme)=> ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '70%'

    }
}))


function Navigation() {
    const classes = useStyles()
    const navElements = useSelector(state => state.settings.navElements)

    return (
        <Box className={classes.root}>
          
           {
               navElements.map((element, index)=> {
                   if(element.alias !=='home') {
                      
                       return (
                           <NavLink key={index} to={element.link} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                               <NavItem name={element.name} icon={element.icon} path={element.link} />
                           </NavLink>
                       )
                       
                   }
                   return null
               })
           }
        </Box>
    )

}

export default Navigation
