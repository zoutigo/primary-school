import React from 'react'
import {AppBar, Toolbar, Grid, Paper, Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles =  makeStyles((theme)=> ({
    root : {
<<<<<<< HEAD

=======
        minHeight: '10vh',
       
    },
    toolbar:{
        minHeight: '100%'
>>>>>>> ee5b5fd... finalize functionality header color change on scroll
    },
    empty :{
        backgroundColor:'yellow',
        [theme.breakpoints.up('lg')]:{
            width: 'calc((100% - 1280px)/2)'
        },
        [theme.breakpoints.up('md')]:{
            width: 'calc((100% - 960px)/2)'
        },
        [theme.breakpoints.down('sm')]:{
            display: 'none'
         }   
    },
    contentLarge : {
        backgroundColor: 'green',
        [theme.breakpoints.up('lg')]:{
            minWidth: '1280px'
        },
        [theme.breakpoints.up('md')]:{
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
    paper : {
        display: 'flex',
        justifyContent: 'space-betwween',
        width: '100vw'
    }

}))

function Header() {
    const classes = useStyles()
<<<<<<< HEAD
    return (
        <AppBar>
            <Toolbar>
=======
    const [headerStyle, setHeaderStyle] = useState({ background: 'transparent', boxShadow: 'none'})

    useEffect(() => {

        const handleScroll = ()=> {
            if (window.pageYOffset > 0) {
               setHeaderStyle({ background: 'white', boxShadow: 'inherit'}) 
                }
            else{
               
                setHeaderStyle({ background: 'transparent', boxShadow: 'none'}) 
                }
        }
        window.addEventListener("scroll", handleScroll)

        return () => {
           window.removeEventListener("scroll", handleScroll )
        }
    }, [window.pageYOffset])
    
    return (
        <AppBar className={classes.root} position='fixed' style={headerStyle}>
            <Toolbar className={classes.toolbar}>
>>>>>>> ee5b5fd... finalize functionality header color change on scroll
                <div className={classes.paper}>
                    <Box variant='div'className={classes.empty} >Vide</Box>
                    <Box variant='div' className={classes.contentLarge}>Logo et navigation</Box>
                    <Box variant='div' className={classes.contentSmall}>Logo et Burger Icon</Box>
                    <Box variant='div' className={classes.empty}>Vide</Box>
                </div>

                {/* <Grid container>
                    <Grid item lg={2} style={{backgroundColor:'yellow'}}> Vide</Grid>
                    <Grid item lg={8} style={{backgroundColor:'green'}} > Logo + navigation</Grid>
                    <Grid item lg={2} style={{backgroundColor:'yellow'}} > vide </Grid>
                </Grid> */}
            </Toolbar>
        </AppBar>
    )
}

export default Header
