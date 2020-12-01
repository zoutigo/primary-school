import { Grid } from '@material-ui/core'
import React from 'react'
import HeadModules from '../HeadModules'
import PrivateSummary from './PrivateSummary'

function Private() {
    return (
       
        <Grid container >
            <Grid item container>
                <HeadModules />
            </Grid>
            <Grid item >
                <PrivateSummary />
            </Grid>
        </Grid>
    )
}

export default Private
