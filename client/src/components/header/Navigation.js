import React from 'react'
import {makeStyles} from '@material-ui/styles'
import {Box} from '@material-ui/core'
import SchoolIcon from '@material-ui/icons/School';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import NavItem from './NavItem'

const useStyles = makeStyles((theme)=> ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '70%'

    }
}))

const navElements = [
    {name: "L'Ecole", link: '/school', icon: <SchoolIcon fontSize="large" /> },
    {name: "Les Activités", link: '/activities', icon: <DirectionsRunIcon  fontSize="large"/>},
    {name: "Les classes", link: '/classrooms', icon: <MeetingRoomIcon fontSize="large" />},
    {name: "Inscriptions", link: '/register', icon: <ListAltIcon  fontSize="large" />},
    {name: "Espace privé", link: '/private', icon: <AccountCircleIcon  fontSize="large" />}
]

function Navigation() {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            {
                navElements.map((element, index)=>{
                    return (
                        <NavItem key={index} name={element.name} link={element.link} icon={element.icon} />
                    )
                })
            }

        </Box>
    )
}

export default Navigation
