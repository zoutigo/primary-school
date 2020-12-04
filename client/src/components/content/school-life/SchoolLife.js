import { Grid } from '@material-ui/core'
import React from 'react'
import HeadModules from '../HeadModules'
import SchoolLifeSummary from './SchoolLifeSummary'
import SubMenuCardGroup from '../SubMenuCardGroup'

function SchoolLife() {
    return (
        
        <Grid container >
            <Grid item container>
                <HeadModules />
            </Grid>
            <Grid item container>
               <SubMenuCardGroup />
            </Grid>
        </Grid>
    )
}

export default SchoolLife
