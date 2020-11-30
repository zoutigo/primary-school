import { Grid } from '@material-ui/core'
import React from 'react'
import HeadModules from '../HeadModules'
import InformationsSummary from './InformationsSummary'

function Informations() {
    return (
       
        <Grid container>
            <Grid item container>
                <HeadModules />
            </Grid>
            <Grid item>
                <InformationsSummary />
            </Grid>
        </Grid>
    )
}

export default Informations
