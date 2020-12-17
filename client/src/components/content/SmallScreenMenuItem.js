import React , {useState}from 'react'
import {NavLink} from 'react-router-dom'


import {makeStyles} from '@material-ui/styles'
import {Button, Typography,IconButton} from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SmallScreenMenuSubItem from './SmallScreenMenuSubItem';

const useStyles = makeStyles((theme)=>({
    root: {
        

    },
    linkbox :{
        minWidth:'100vw',
        minHeight:'3rem',
        background: theme.palette.third.ligth,
        border: 'white 1px solid',
        display:'flex',
        
        '&:hover': {
            background: theme.palette.success.light,
            color:'red'
        },
        '& a':{
            // background:'black',
            flexGrow: 1,
            marginLeft: '20%'
        },
        '& div':{
        //   background:'orange',
          width:'20%',
          borderLeft:'white solid 1px', 
          textAlign:'center'
        }
    },
    subcategory :{
    '& div':{
        paddingLeft: '40%',
        '&:hover': {
            background: theme.palette.success.light,
            color:'red'
        }
    }

    },
    

}))

function SmallScreenMenuItem({categories, rubric, index, toogleSubMenu, toogleScMenu, toogleCategory}) {

    const classes = useStyles()

    

    const handleClick = ()=>{
        toogleScMenu()
        toogleSubMenu(index)
    }
    return (
        <div className={classes.root}>
             {
                 categories.map((el, i)=>{
                    return(
                        <div key={i}>
                                <div>
                                    <div key={i}  className={classes.linkbox} >
                                        <NavLink
                                        to= {{pathname:el.link, rubric:rubric, category:el.designation, subcategories:el.subcategories}}
                                        onClick={handleClick}
                                        style={{ color: 'inherit', textDecoration: 'inherit'}} 
                                        
                                        activeClassName={classes.active}
                                        >
                                        <Typography variant='h6'> {el.designation} </Typography>
                                        </NavLink>
                                        {
                                           el.subcategories &&
                                           <div >
                                           <span onClick={()=> toogleCategory(index,i)}>
                                               <IconButton>
                                                   <KeyboardArrowDownIcon />
                                               </IconButton>
                                           </span>
                                          </div>
                                       } 
                                    </div>
                                  
                                </div>
                                <div className={classes.subcategory}>
                                {
                                       el.subdisplay && el.subcategories && el.subcategories.map((subcategory, i)=>{
                                            return <SmallScreenMenuSubItem 
                                                   key={i}
                                                   subcategory={subcategory}
                                                   rubric={rubric}
                                                   handleClick={handleClick}
                                            />
                                        })
                                    }
                                </div>
                            
                        </div>
                        
                    )
                })
             }
                       

            

        </div>
    )
}

export default SmallScreenMenuItem
