import React from 'react'
import {useLocation } from 'react-router-dom'
import SubMenuCard from './SubMenuCard'
import { Grid } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme)=>({
    root :{
        minWidth:'100%',
        maxWidth:'100%',
        display: 'flex',
        
      
        flexWrap: 'wrap',
        '& >div' : {
            flex: 'auto',
            display : 'flex',
            justifyContent:'center',
            margin: '1em auto'
            
            
        }
      
    },
    width2 :{
        
        minWidth: '49vw',
       
    },
    width3 :{
        
        minWidth: '32.5vw',

    },
    
}))

function SubMenuCardGroup() {

    const {pathname, categories} = useLocation()
    const classes = useStyles()

   

    const width = ()=>{
       

        switch (categories.length) {
            case 2:
                return classes.width2
            
        
            default:
                return classes.width3
        }
    }
   
    return (
   
    <div className={classes.root}>
        {
           categories && categories.map((category, index)=>{
               return (
                   <div item  key={index} className={width()}  >
                       <SubMenuCard  category={category} />
                   </div>
               )
           })
        }

    </div>
    )
}

export default SubMenuCardGroup
