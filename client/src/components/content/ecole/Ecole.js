import { Grid } from '@material-ui/core'
import React from 'react'
import HeadModules from '../HeadModules'
import EcoleSummary from './EcoleSummary'

function Ecole() {
    return (
       
        <Grid container >
            <Grid item container>
                <HeadModules />
            </Grid>
            <Grid item container >
                <EcoleSummary />
            </Grid>
        </Grid>
    )
}

export default Ecole
