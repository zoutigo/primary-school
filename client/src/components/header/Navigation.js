import React from 'react'
import {useSelector} from 'react-redux'




import {makeStyles} from '@material-ui/styles'
import {Box} from '@material-ui/core'

import NavItem from './NavItem'

const useStyles = makeStyles((theme)=> ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '85%'

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
                      
                       return <NavItem key={index} element={element} />
                       
                   }
                   return null
               })
           }

        </Box>
    )

}

export default Navigation
