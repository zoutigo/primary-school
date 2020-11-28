import React from 'react'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme)=> ({
    root : {
        background: 'skyblue',
        minWidth: '100vw',
        minHeight: '100vh'
    }
}))


function Content() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            Here the content
        </div>
    )
}

export default Content
