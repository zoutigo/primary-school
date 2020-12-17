import React from 'react'
import {makeStyles} from '@material-ui/styles'
import { Icon, Typography } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import LocalMallRoundedIcon from '@material-ui/icons/LocalMallRounded';

const useStyles = makeStyles((theme)=>({
    root:{
        '& *':{
            listStyle: 'none'
        },
    
        textAlign: 'center',
        border:'solid 1px',
        borderRadius: '3px',
        padding:'1em',
        '& div':{
            'width':'100%'
        }
    },
    title:{
        'background':theme.palette.warning.light,
        'color': 'white',
        'height': '3em',
            

    },
    items :{
        marginTop: '3em',
       
        '& div':{
           height: '3em' ,
           marginBottom: '4em',
           display: 'flex',
           justifyItems:'flex-start',
           alignItems: 'center'
        },
        '& div ul':{
            '& li': { 
                textAlign:'left'
            },
            '& li:first-child':{
                textTransform:'uppercase',
                marginTop:'1em'
            }
        }
    },
    icon :{
        color:theme.palette.warning.light,
        // borderRadius: '50%',
        width: '1.4em',
        height: '1.4em',
        marginRight: '0.1em',
       
    }
}))

function ClassroomInfos() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                 <Typography variant='h4'>
                     Information
                 </Typography>
            </div>
            <div className={classes.items}>
                <div>
                     <PersonIcon fontSize='large' className={classes.icon} style={{borderRadius:'50%'}}/>
                    <ul>
                        <li> <Typography variant='h5'> Enseignants</Typography> </li>
                        <li> <Typography variant='h6'> Pierre Dumoulin</Typography> </li>
                    </ul>
                    
                </div>
                <div>
                     <LocalMallRoundedIcon fontSize='large' className={classes.icon}/>
                    <ul>
                        <li> <Typography variant='h5'> Eleves</Typography> </li>
                        <li> <Typography variant='h6'> 28 élèves</Typography> </li>
                    </ul>
                    
                </div>
                <div>
                     <MailOutlineRoundedIcon fontSize='large' className={classes.icon} style={{borderRadius:'5%'}}/>
                    <ul>
                        <li> <Typography variant='h5'> Contact</Typography> </li>
                        <li> <Typography variant='h6'> cp2@st-augustin.com</Typography> </li>
                    </ul>
                    
                </div>
                <div>
                     <HelpRoundedIcon fontSize='large' className={classes.icon}/>
                    <ul>
                        <li> <Typography variant='h5'> Autre</Typography> </li>
                        <li> <Typography variant='h6'> Rien du tout</Typography> </li>
                    </ul>
                    
                </div>


            </div>
        </div>
    )
}

export default ClassroomInfos
