import React from 'react'
import {useLocation } from 'react-router-dom'
import SubMenuCard from './SubMenuCard'
import { Grid } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme)=>({
    root :{

    },
    submenucard : {
        display: 'flex',
        justifyContent: 'center'
    }

}))

function SubMenuCardGroup() {

    const {pathname, categories} = useLocation()
    const classes = useStyles()
   
    return (
       <Grid container justify='center' className={classes.root}>
        {
           categories && categories.map((subrubric, index)=>{
               return (
                   <Grid item key={index} sm={12} md={6} lg={4}  className={classes.submenucard}>
                       <SubMenuCard  />
                   </Grid>
               )
           })
        }
    </Grid>
    )
}

export default SubMenuCardGroup
