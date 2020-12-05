import React from 'react'
import {makeStyles, useTheme} from '@material-ui/styles'

import {TimelineLite, TweenMax, Power3} from 'gsap'
import {useRef, useEffect} from 'react'

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
          
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '8em',
            // fontWeight: 'bold' ,
            letterSpacing: '1px',
            lineHeight: 4  ,
            color: theme.palette.success.light,
            [theme.breakpoints.down('md')]: {
                fontSize: '3em',
                lineHeight: 1
            }
    },
    mobileContent : {
        color : theme.palette.success.light,
        transition: '1000 ease'
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
    console.log('mobile', isMobile)

    const content = isMobile ? classes.mobileContent : classes.content

    const contentText = subrubric ? subrubric : rubric


    let slider = useRef(null)
 
    useEffect(() => {
        TweenMax
        .from(slider, 2.5, {y: -1000, opacity:1 , ease: Power3.easeOut})
        
    }, [rubric, subrubric])


    return (
        <div className={`${classes.root} ${classes.content}`}>
            <div ref={el => {slider = el}} > {contentText} </div>
        </div>
    )
}

export default HeadModules
