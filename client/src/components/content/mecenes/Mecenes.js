import React from 'react'
import HeadModules from '../HeadModules'
import MecenesSummary from './MecenesSummary'
import {Grid} from '@material-ui/core'

function Mecenes() {
    return (
       
        <Grid container >
            <Grid item container>
                <HeadModules />
            </Grid>
            <Grid item container >
                <MecenesSummary />
            </Grid>
        </Grid>
    )
}

export default Mecenes
