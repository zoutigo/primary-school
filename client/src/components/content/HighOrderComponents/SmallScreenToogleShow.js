import React from 'react'
import {useSelector} from 'react-redux'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, makeStyles} from '@material-ui/styles'
import {useLocation} from 'react-router-dom'


const SmallScreenToogleShow = OriginalComponent=>{
   
    const useStyles = makeStyles({
        hide: {
            display: 'none'
        },
        show : {
            display: 'block'
        },
        hideMenu : {
            transform: 'translateY(-200%)',
            transition: 'transform 0.5s ease'
        },
        showMenu : {
            transform: 'translateY(0)',
            transition: 'transform 0.5s ease',
            zIndex: '5' 
        },
    })
    function NewComponent() {
        const classes = useStyles()
        const theme = useTheme()

        const {pathname} = useLocation()
        const home = pathname === '/'
        const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
        const smallScreenMenuIsOpened = useSelector(state => state.settings.smallScreenMenuIsOpened)
    

        const toogleHeadModulesClass = !home || smallScreenMenuIsOpened
        
        ? classes.show : classes.hide
        
        
        const toogleSmallScreenMenuClass = isSmallScreen && smallScreenMenuIsOpened ? classes.showMenu : classes.hideMenu
        const toogleContentClass = isSmallScreen && smallScreenMenuIsOpened ? classes.hide : classes.show
        
        console.log('home :', home)
        console.log('isSmallScrenn:', isSmallScreen)
        console.log('smallScreenMenuIsOpened:',smallScreenMenuIsOpened)
        return <OriginalComponent 
                toogleHeadModulesClass={toogleHeadModulesClass}
                toogleSmallScreenMenuClass={toogleSmallScreenMenuClass}
                toogleContentClass={toogleContentClass}
                />
                
    }

    return NewComponent
      
}

export default SmallScreenToogleShow