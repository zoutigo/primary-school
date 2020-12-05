import React from 'react'
import {makeStyles, useTheme} from '@material-ui/styles'

import {useLocation} from 'react-router-dom'

import image from '../../images/content2.jpg'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme)=> ({
    root : {
        width: '100vw',
        minHeight: '35vh',
        backgroundSize: 'cover',
        background: `linear-gradient(to top, transparent 50%, green),
        url(${image})`,
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    content: {
        color: 'blue'
    },
    mobileContent : {
        color : 'white'
    },
    rubric : {

    },
    subrubric : {

    }

}))

function HeadModules() {
    const classes = useStyles()
    const { rubric, subrubric} = useLocation()
    const style= useStyles()
    const theme = useTheme()
    const isMobile = theme.breakpoints.down('md')
    const content = isMobile ? classes.mobileContent : classes.content


    
    return (
        <div className={`${classes.root} ${content}`}>
           <span className={classes.rubric}>
               <Typography variant='h2'>{rubric} </Typography> </span>
           <span className={classes.subrubric}> 
               <Typography variant='h4'> {subrubric} </Typography> </span>
        </div>
    )
}

export default HeadModules
