import React from 'react'
import {useSelector} from 'react-redux'




import {makeStyles} from '@material-ui/styles'
import {Box} from '@material-ui/core'

import NavItem from './NavItem'

const useStyles = makeStyles((theme)=> ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '85%',
        

    }
}))


function Navigation() {
    const classes = useStyles()
    const rubrics = useSelector(state => state.settings.rubrics)

    return (
        <Box className={classes.root}>
          
           {
               rubrics.map((rubric, index)=> {
                   if(rubric.alias !=='home') {
                      
                       return <NavItem key={index} rubric={rubric} />
                       
                   }
                   return null
               })
           }

        </Box>
    )

}

export default Navigation
