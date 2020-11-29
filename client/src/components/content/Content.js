import React from 'react'
import {makeStyles} from '@material-ui/styles'
import image from '../../images/content.jpg'

const useStyles = makeStyles((theme)=> ({
    root : {
        background: 'skyblue',
        width: '100vw',
        minHeight: '100vh',
        backgroundSize: 'cover',
      
        background: `linear-gradient(to top, transparent 80%, green),
        url(${image})`
    }
}))


function Content() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
           </div>
    )
}

export default Content
