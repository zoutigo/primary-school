import React from 'react'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme)=> ({
    root : {
        background: theme.palette.grey[800],
        minWidth: '100vw',
        minHeight: '25vh'
    }
}))

function Footer() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            Here the footer
        </div>
    )
}

export default Footer
