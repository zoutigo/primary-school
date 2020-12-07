import React from 'react'
import {useLocation } from 'react-router-dom'
import SubMenuCard from './SubMenuCard'
import { Grid } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme)=>({
    root :{
        minWidth:'100%',
        maxWidth:'100%',
        
    },
    submenucard : {
        display: 'flex',
        justifyContent: 'center',
       
        margin: '2em'
    }

}))

function SubMenuCardGroup() {

    const {pathname, categories} = useLocation()
    const classes = useStyles()
   
    return (
       <Grid container justify='space-evenly' className={classes.root}>
        {
           categories && categories.map((subrubric, index)=>{
               return (
                   <Grid item key={index} sm={12} md={6} lg={3}  className={classes.submenucard}>
                       <SubMenuCard  />
                   </Grid>
               )
           })
        }
    </Grid>
    )
}

export default SubMenuCardGroup
