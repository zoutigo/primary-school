import React from 'react'
import {NavLink} from 'react-router-dom'

import {makeStyles} from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    root: {

    },
    linkbox :{
        minHeight:'3rem',
        background: theme.palette.third.ligth,
        border: 'white 1px solid',
        
        paddingLeft: theme.spacing(6),
        '&:hover': {
            background: theme.palette.success.light,
            color:'red'
        }
    },
    linkText :{

    }
}))

function SmallScreenMenuItem({categories, rubric, index, toogleSubMenu, toogleScMenu}) {

    const classes = useStyles()
    const handleClick = ()=>{
        toogleScMenu()
        toogleSubMenu(index)
    }
    return (
        <>
             {
                 categories.map((el, i)=>{
                    return(
                        <div key={i} className={classes.linkbox}  >
                            <NavLink
                            to= {{pathname:el.link, rubric:rubric, category:el.designation}}
                            onClick={handleClick}
                            style={{ color: 'inherit', textDecoration: 'inherit'}} 
                            
                            activeClassName={classes.active}
                            >
                               <Typography variant='h6'> {el.designation} </Typography>
                            </NavLink>
                         </div>
                    )
                })
             }
        </>
    )
}

export default SmallScreenMenuItem
