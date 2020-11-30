import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles, useTheme} from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {Switch, Route} from 'react-router-dom'
import Informations from './informations/Informations'
import Private from './private/Private'
import Home from './home/Home'
import Classrooms from './classrooms/Classrooms'
import SchoolLife from './school-life/SchoolLife'
import ErrorPage from './ErrorPage'
import SmallScreenMenu from './SmallScreenMenu'
import Ecole from './ecole/Ecole';
import Mecenes from './mecenes/Mecenes';


function Content() {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
   

    return (
        <>
        {
            isSmallScreen && <SmallScreenMenu /> 
        }
        <Switch>
            <Route path='/' exact component ={Home} />
            <Route path='/informations' exact component={Informations} />
            <Route path='/mecenes' exact component={Mecenes} />
            <Route path='/ecole' exact component={Ecole} />
            <Route path='/private' exact component={Private} />
            <Route path='/classes' exact component={Classrooms} />
            <Route path='/vie-scolaire' exact component={SchoolLife} />
            <Route component={ErrorPage} />
         </Switch>
         </>
    )
}

export default Content
