import { Grid } from '@material-ui/core'
import React from 'react'
import HeadModules from '../HeadModules'
import ClassroomsSummay from './ClassroomsSummay'

function Classrooms() {
    return (
      
        <Grid container >
            <Grid item container>
                <HeadModules />
            </Grid>
            <Grid item container>
                <ClassroomsSummay />
            </Grid>
        </Grid>
    )
}

export default Classrooms
