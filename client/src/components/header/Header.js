import React , {useEffect, useState} from 'react'
import {AppBar, Toolbar, Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Logo from './Logo'
import Navigation from './Navigation'

const useStyles =  makeStyles((theme)=> ({
    root : {
        minHeight: '10vh',
        minWidth: '100vw' 
    },
    toolbar : {
        display: 'flex',
        justifyContent: 'space-betwween',
        minWidth: '100%',
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
        backgroundColor: 'blue',
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


    return (
        <AppBar className={`${classes.root } ${headerColor}`} >
            <Toolbar className={classes.toolbar}>
               
                    <Box variant='div'className={classes.empty} ></Box>
                    <Box variant='div' className={classes.contentLarge}>
                        <Logo /> 
                        <Navigation />
                    </Box>
                    <Box variant='div' className={classes.contentSmall}>Logo et Burger Icon</Box>
                    <Box variant='div' className={classes.empty}></Box>
              
            </Toolbar>
        </AppBar>
    )
}

export default Header
