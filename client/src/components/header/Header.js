import React , {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppBar, Toolbar, Box, IconButton, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {NavLink} from 'react-router-dom'

import {openBurgerMenu} from '../../redux/settings/settingsActions'

import Navigation from './Navigation'
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';

import logo from '../../images/logo.png'

const useStyles =  makeStyles((theme)=> ({
    root : {
        padding: '0px',
        margin: '0px',
  
    },
    toolbar : {
        display: 'flex',
        justifyContent: 'space-betwween',
        alignItems: 'center',
        maxWidth: '100vw',
        minWidth:'100vw',
        minHeight: '12vh',
         
    },
    
    contentLarge : {
        minWidth:'85vw',
        display:'flex', 
        marginLeft:'7vw', 
        alignItems:'center',
         '& > :first-child':{
            flexGrow: 1
        },
        '& > :last-child': {
            minWidth:'75%'
        },
        [theme.breakpoints.down('sm')]:{
            display: 'none'
         } 

    },
    contentSmall : {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth:'100%',
        '& > :last-child' : {
            marginRight : '7vw'
        },
        [theme.breakpoints.up('md')]:{
            display: 'none'
        }  
    },
    
    scrolledStyle : {
        background: theme.palette.success.main,
        boxShadow: 'inherit',
        transition: 'background 1s ease'
    },
    unscrolledStyle : {
        background: 'transparent',
        boxShadow: 'none',
        transition: 'background 1s ease'
    },
    logoLarge : {
        width: theme.spacing(12),
        height: theme.spacing(12)
    },
    smallIconsSizes : {
        width: theme.spacing(8),
        height: theme.spacing(8)
    },
   
    burgerColor : {
        color: theme.palette.warning.light
    },
    

}))

function Header() {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [scroll, setScroll] = useState(false)
    const headerColor = scroll ? classes.scrolledStyle : classes.unscrolledStyle
    const burgerMenuIsOpened = useSelector(state => state.settings.burgerMenuIsOpened)


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
        <AppBar className={`${classes.root } ${headerColor}`}  >
            <Toolbar className={classes.toolbar}>
               
                    <div  className={classes.contentLarge}  >
                        <div >
                            <Logo className={classes.logoLarge} />
                        </div>
                        <div  >
                            <Navigation />
                        </div>
                    </div>
                    
                    <Box  className={classes.contentSmall} >
                        <Logo className={`${classes.smallIconsSizes} `}  />
                        <div>
                              <IconButton  onClick={()=> dispatch(openBurgerMenu())}   >

                                {
                                    burgerMenuIsOpened 
                                    ? <MenuIcon className={`${classes.smallIconsSizes} ${classes.burgerColor}`} />
                                    : <CancelIcon className={`${classes.smallIconsSizes} ${classes.burgerColor}`} />
                                }
                                </IconButton>
                        </div>
                        
                    </Box>
                   
              
            </Toolbar>
        </AppBar>
    )
}

export default Header
