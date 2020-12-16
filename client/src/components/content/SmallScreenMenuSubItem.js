import React , {useState} from 'react'
import {makeStyles} from '@material-ui/styles'
import {Typography} from '@material-ui/core'
import {NavLink} from 'react-router-dom'


const useStyles = makeStyles((theme)=>({
    root:{

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


function SmallScreenMenuSubItem(props) {
    const classes = useStyles()
    const {subcategory, rubric, handleClick} = props

    const [open, setOpen] = useState(false)

    const manageClick = ()=>{
        setOpen(!open)
        handleClick()

    }
    return (
        <div className={classes.root}>
              <NavLink
                to= {{pathname:subcategory.link, rubric:rubric, category:subcategory.designation}}
                onClick={manageClick}
                style={{ color: 'inherit', textDecoration: 'inherit'}} 
                
                activeClassName={classes.active}
                >
                <Typography variant='h6'> {subcategory.designation} </Typography>
                </NavLink>
            
        </div>
    )
}

export default SmallScreenMenuSubItem
