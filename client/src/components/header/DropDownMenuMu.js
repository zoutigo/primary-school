import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme)=>({
    root: {
        height: '35px',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        float: 'left',
        textAlign: 'center',
        background:'blue',
        '& li':{
            display: 'inline-block',
            position: 'relative',
            float: 'left',
            width: '200px',
            lineHeight: '35px',
            textDecoration: 'none'
        },
        '& li li a':{
            fontSize: '67px'
        },
        '& li:hover':{
            background:'yellow'
        },
        '& ul':{
            position: 'absolute',
            display: 'none',
        },
        '& li:hover ul ul':{
            display: 'none'
        },
        '& li:hover ul':{
            display: 'block'
        },
        '& li li:hover ul':{
            marginLeft: '200px',
            marginTop: '-35px',
            display: 'block'
        }
    },

}))

function DropDownMenuMu(props) {
    const classes = useStyles()
    const {config} = props
   

    return (
        <ul className={classes.root}>
           
            <li> <a href='#'>Le bus</a>
                   <ul>
                        <li>cannardd</li>
                        <li>cannardd</li>
                        <li>cannardd</li>
                        <li>cannardd</li>
                    </ul>

            </li>
            
               
            
            <li>Panneau</li>
            <li>Panneau</li>
            <li>Panneau</li>
            <li>Panneau</li>
        </ul>
    )


}

export default DropDownMenuMu


