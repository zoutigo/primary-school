import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/styles'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import {NavLink} from 'react-router-dom'
import {Button, Typography,IconButton} from '@material-ui/core'

import SmallScreenMenuItem from './SmallScreenMenuItem'

import {openSubMenu, toogleSmallScreenMenu} from '../../redux/settings/settingsActions'
import SmallScreenToogleShow from './HighOrderComponents/SmallScreenToogleShow';

const useStyles = makeStyles((theme)=>({
    root : {
        width: '100%',
        minWidth: '100vw',
        zIndex: 2 ,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        top: '7em',
        transform: 'translate(0, -200%)'
    },
    box : {
        background: theme.palette.error.light,
        margin: '3px',
        display:'flex', 
        alignItems:'center', 
        height:'3rem'
          
    },
    text : {
        
        marginLeft: theme.spacing(3),
        
    },
    link : {
        flexGrow: 1 ,
        paddingLeft: '6vw',
        // height: '11vh',
        // paddingTop: '2vh'
    },
    button : {
        background: theme.palette.warning.light,
        width: '99%',
        margin: '3px',
        height: '11vh'
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
    active : {
        color: theme.palette.warning.light
    },
    navlink: {
        color: 'inherit', 
        textDecoration: 'inherit',
        background: 'blue'
    }

}))


function SmallScreenMenu(props) {
    const {toogleSmallScreenMenuClass} = props
    const classes = useStyles()
    const dispatch = useDispatch()

    const rubrics = useSelector(state => state.settings.rubrics)
   

    const toogleSubMenu = (ind)=> dispatch(openSubMenu(ind))
    const toogleScMenu = () => dispatch(toogleSmallScreenMenu())

    return (
        <div className={`${classes.root} ${toogleSmallScreenMenuClass}`}>
            {
                rubrics.map((element, index)=>{
                    const {name, link, categories} = element
                   
                    if (element.alias !== 'home'){

                        return (
                            <div key={index}>
                            <div className={classes.box}  >
                                    
                                       <div  className={classes.link} >
                                             <NavLink to={{pathname:link, categories:categories, rubric:name}}
                                                onClick={toogleScMenu} 
                                                className={classes.navlink}
                                                activeClassName={classes.active}
                                                >
                                                <Typography variant='h6'> {name} </Typography>
                                             
                                            </NavLink>
                                       </div>
                                       {
                                           categories &&
                                           <div style={{width:'20%', borderLeft:'white solid 1px', textAlign:'center' }}>
                                           <span onClick={()=> toogleSubMenu(index)}>
                                               <IconButton>
                                                   <KeyboardArrowDownIcon />
                                               </IconButton>
                                           </span>
                                        </div>
                                       } 
                                        
                                  
                            </div>
                            {
                            
                            element.subdisplay && element.categories && 
                            <SmallScreenMenuItem categories={categories} index={index} toogleSubMenu={toogleSubMenu} toogleScMenu={toogleScMenu} rubric={element.name} />
                           
                            }
                            </div>
                            
                            
                         )
                    }
                    return null
                       
                })
            }
             <Button 
             variant='outlined'  
             className={classes.button}
             onClick={()=> dispatch(toogleSmallScreenMenu())} 
             >
                Fermer cette fenetre
             </Button>
            
        </div>
    )
}

export default  SmallScreenToogleShow(SmallScreenMenu) 
