import React from 'react'
import {useLocation } from 'react-router-dom'
import SubMenuCard from './SubMenuCard'
import { Grid } from '@material-ui/core'

function SubMenuCardGroup() {

    const {pathname, subrubrics} = useLocation()
   
    return (
       <Grid container>
        {
           subrubrics && subrubrics.map((subrubric, index)=>{
               return (
                   <Grid item key={index} sm={12} md={6} lg={4} >
                       <SubMenuCard  />
                   </Grid>
               )
           })
        }
    </Grid>
    )
}

export default SubMenuCardGroup
