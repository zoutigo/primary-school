import React from 'react'
import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme)=>({
    root:{
        marginTop: '0.1em',
        display:'inline-block',
        // [theme.breakpoints.up('lg')]:{
        //     marginLeft:'15%'
        // },
        // [theme.breakpoints.between('sm','md')]:{
        //     marginLeft:'7%'
        // },
        // [theme.breakpoints.down('sm')]:{
        //     marginLeft:'1%'
        // }
        
    },
    button:{
        height:'3.2em',
        width:'12vw',
        margin: '1em'
    }
}))


function ClassroomButtons() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
           <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<EventAvailableIcon />}
      >
       Les evenements
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<LibraryBooksIcon />}
      >
        Les articles
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<PhotoCameraIcon />}
      >
        Les albums ?
      </Button>
        </div>
    )
}

export default ClassroomButtons
