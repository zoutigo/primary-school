import React from 'react'
import {makeStyles} from '@material-ui/styles'


const useStyles = makeStyles((theme)=>({
    root:{
        '& ul ul ul':{
            left: '100%',
            top: 0,
            marginLeft:'1px' 
        },
        '& li:hover':{
            backgroundColor: '#F0F0F0'
        }
    },
    parent : {
        display: 'block',
        position: 'relative',
        float: 'left',
        lineHeight: '30px',
        backgroundColor: '#4FA0D8',
        borderRight:'#CCC 1px solid',
        '& a':{
            margin: '10px',
            color: '#FFFFFF',
            textDecoration: 'none'
        },
        '&:hover >ul':{
            display:'block',
            position:'absolute'
        }
    },
    child:{
        display:'none',
        '& li':{
            backgroundColor: '#E4EFF7',
            lineHeight: '30px',
            borderBottom:'#CCC 1px solid',
            borderRight:'#CCC 1px solid',
            width:'100%'
        },
        '& li a':{
            color: '#000000'
        }
    }

}))

// .parent {display: block;position: relative;float: left;line-height: 30px;background-color: #4FA0D8;border-right:#CCC 1px solid;} */
// .parent a{margin: 10px;color: #FFFFFF;text-decoration: none;}
// .parent:hover > ul {display:block;position:absolute;} */

// .child {display: none;}
// .child li {background-color: #E4EFF7;line-height: 30px;border-bottom:#CCC 1px solid;border-right:#CCC 1px solid; width:100%;}
// .child li a{color: #000000;}

//  ul{list-style: none;margin: 0;padding: 0px; min-width:10em;}
//  ul ul ul{left: 100%;top: 0;margin-left:1px;}  ok
//  li:hover {background-color: #95B4CA;}
// .parent li:hover {background-color: #F0F0F0;} ok
// .expand{font-size:12px;float:right;margin-right:5px;}

function DropDownMenuTest() {

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <ul>
                <li className={classes.parent}> Les animaux
                    <ul className={classes.child}>
                            <li className={classes.parent}>
                                <ul className={classes.child}>
                                    <li>Canard</li>
                                    <li>Poules</li>
                                    <li>Poules</li>
                                </ul>
                            </li>
                    </ul>

                </li>
                <li className={classes.parent}> Les Vegetaux
                    <ul className={classes.child}>
                            <li className={classes.parent}>
                                <ul className={classes.child}>
                                    <li>Canard</li>
                                    <li>Poules</li>
                                </ul>
                            </li>
                    </ul>

                </li>
                <li className={classes.parent}> Les Voitures
                    <ul className={classes.child}>
                            <li className={classes.parent}>
                                <ul className={classes.child}>
                                    <li>Canard</li>
                                    <li>Poules</li>
                                </ul>
                            </li>
                    </ul>

                </li>
            </ul>
            
        </div>
    )
}

export default DropDownMenuTest


