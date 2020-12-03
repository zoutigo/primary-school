import React from 'react'
import {makeStyles} from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme)=> ({
    root : {
        background: theme.palette.grey[800],
        width: '98vw',
        minHeight: '25vh',
        color: 'white'
    }
}))

function Footer() {
    const classes = useStyles()


    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
      if (anchorEl !== event.currentTarget) {
        setAnchorEl(event.currentTarget);
      }
    }
  
    function handleClose() {
      setAnchorEl(null);
    }
  
    return (
        <div>
                 {/* <div style={{margin:'10em'}}>
                        <Button
                        aria-owns={anchorEl ? "simple-menu" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        onMouseOver={handleClick}
                        >
                        Open Menu
                        </Button>
                        <Menu
                        id="simple-menu"
                        elevation={10}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{ onMouseLeave: handleClose }}
                        >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </div> */}
                    <div className={classes.root}>
                        <Typography variant='h1'>
                            Notre pied de page sera ici
                        </Typography>
                    </div>



        </div>

        
     


    );
    

    // return (
    //     <div className={classes.root}>
    //         <Typography variant='h1'>
    //             Notre pied de page sera ici
    //         </Typography>
    //     </div>
    // )
}

export default Footer
