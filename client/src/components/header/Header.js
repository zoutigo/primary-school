import React , {useEffect, useState} from 'react'
import {AppBar, Toolbar, Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

import {NavLink} from 'react-router-dom'

import Navigation from './Navigation'
import MenuIcon from '@material-ui/icons/Menu';

import logo from '../../images/logo.png'

const useStyles =  makeStyles((theme)=> ({
    root : {
        minHeight: '10vh',
        width: '100vw' 
    },
    toolbar : {
        display: 'flex',
        justifyContent: 'space-betwween',
        width: '100%',
        minHeight: '10vh'
    },
    
    empty :{
        
        [theme.breakpoints.up('lg')]:{
            width: 'calc((100% - 1280px)/2)'
        },
        [theme.breakpoints.down('md')]:{
            width: 'calc((100% - 960px)/2)'
        },
        [theme.breakpoints.down('sm')]:{
            display: 'none'
         }   
    },
    contentLarge : {
     
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.up('lg')]:{
            minWidth: '1280px'
        },
        [theme.breakpoints.down('md')]:{
            minWidth: '960px'
        },
        [theme.breakpoints.down('sm')]:{
           display: 'none'
        } 
    },
    contentSmall : {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '100%',
        [theme.breakpoints.up('md')]:{
            display: 'none'
        }
       
    },
    
    scrolledStyle : {
        background: theme.palette.primary.main,
        boxShadow: 'inherit',
        transition: 'background 1s ease'
    },
    unscrolledStyle : {
        background: 'transparent',
        boxShadow: 'none',
        transition: 'background 1s ease'
    },
    logoLarge : {
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    logoSmall : {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: theme.spacing(4)
    }  
   

}))

function Header() {
    const classes = useStyles()
    const [scroll, setScroll] = useState(false)
    const headerColor = scroll ? classes.scrolledStyle : classes.unscrolledStyle


    useEffect(() => {
        const handleScroll = ()=>{
            if (window.pageYOffset > 0 ) {
                setScroll(true)
             
            }else{
                setScroll(false)
          
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)     
        }
    }, [])

    const Logo = ({className})=>{
        return (
            <NavLink to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <img src={logo} alt='logo' className={className}/>
            </NavLink>
        )
    }


    return (
        <AppBar className={`${classes.root } ${headerColor}`} >
            <Toolbar className={classes.toolbar}>
               
                    <Box variant='div'className={classes.empty} ></Box>
                    <Box variant='div' className={classes.contentLarge}>
                        <Logo className={classes.logoLarge}/> 
                        <Navigation />
                    </Box>
                    <Box variant='div' className={classes.contentSmall}>
                        <Logo className={classes.logoSmall} />
                        <MenuIcon className={classes.logoSmall} />
                    </Box>
                    <Box variant='div' className={classes.empty}></Box>
              
            </Toolbar>
        </AppBar>
    )
}

export default Header
