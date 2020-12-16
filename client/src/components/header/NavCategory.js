import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme)=>({
    root: {

    },

    dropdownContent :{
        display: 'none',
        position:'absolute',
        zIndex: 1,
        minWidth: '15em',
        background:theme.palette.primary.main,
     
    },
    dropdownLink : {
        minHeight: theme.spacing(5),
        borderTop: 'white solid 1px',
        '&:hover': {
            background: theme.palette.success.light,
            color:'red'
        }
    },
    hello :{
       color:'green',
       display: 'none'
    }
    
}))

const Navi = ()=>{
  const cats = [1, 2, 4, 67, 98 , 89]

//   categories && categories.map((category, index)=>{
//       return (
//           <div key={index} style={{display:'flex'}}>
//               <div> hello</div>
//               <div> John</div>
//           </div>
//       )
//   })

    return (
        <div>
            {cats.map((cat, i)=> {
                return <div key={i}> {cat} </div>
            })}
        </div>
    )
}

function NavCategory(props) {
    const {categories, setClicked, rubricName} = props
    const classes = useStyles()
    const categoryClass = classes.category
    return (
        <Box className={`${classes.dropdownContent} `} >
                     {
                                  categories && categories.map((category, index)=>{
                                    return (
                                        <div key={index} style={{display:'flex'}}>
                                            <div> hello</div>
                                            <div> John</div>
                                        </div>
                                    )
                                })
                            }
                     <div 
                         key={index} 
                         className={`${classes.dropdownLink} `}
                       
                         onClick= {()=> setClicked(true)}
                         >
                         <NavLink  
                             to= {{pathname:item.link, rubric:rubricName, category:item.designation, subcategories:item.subcategories}}
                             style={{ color: 'inherit', textDecoration: 'inherit'}}  >
                             <Typography variant='h6' style={{marginLeft:'8px'}}> {item.designation} </Typography>
                         </NavLink>

                        </div>
                        <div>
                            
                            </div> 


            {/* <Navi cat={categories} /> */}
       </Box> 
    )
}

export default NavCategory
