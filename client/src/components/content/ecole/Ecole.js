import { Grid } from '@material-ui/core'
import React from 'react'
import HeadModules from '../HeadModules'
import SubMenuCardGroup from '../SubMenuCardGroup'


function Ecole() {
    return (
       
        <Grid container >
            <Grid item container>
                <HeadModules />
            </Grid>
            <Grid item container >
                <SubMenuCardGroup />
            </Grid>
        </Grid>
    )
}

export default Ecole
