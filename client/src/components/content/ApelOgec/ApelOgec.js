import React from 'react'
import HeadModules from '../HeadModules'
import ApelOgecSummary from './ApelOgecSummary'
import {Grid} from '@material-ui/core'

function ApelOgec() {
    return (
       
        <Grid container >
            <Grid item container>
                <HeadModules />
            </Grid>
            <Grid item container >
                <ApelOgecSummary />
            </Grid>
        </Grid>
    )
}

export default ApelOgec
