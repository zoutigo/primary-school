import React from 'react'
import {makeStyles} from '@material-ui/styles'

import {Switch, Route} from 'react-router-dom'
import Informations from './informations/Informations'
import Contacts from './contacts/Contacts'
import Private from './private/Private'
import Etablissement from './etablissement/Etablissement'
import Home from './home/Home'
import Classrooms from './classrooms/Classrooms'
import SchoolLife from './school-life/SchoolLife'
import ErrorPage from './ErrorPage'


function Content() {
 
    return (
        <Switch>
            <Route path='/' exact component ={Home} />
            <Route path='/informations' exact component={Informations} />
            <Route path='/contacts' exact component={Contacts} />
            <Route path='/etablissement' exact component={Etablissement} />
            <Route path='/private' exact component={Private} />
            <Route path='/classes' exact component={Classrooms} />
            <Route path='/vie-scolaire' exact component={SchoolLife} />
            <Route component={ErrorPage} />
         </Switch>
    )
}

export default Content
