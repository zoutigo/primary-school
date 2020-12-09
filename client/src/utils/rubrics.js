import React from 'react'

import SchoolIcon from '@material-ui/icons/School';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EcoSharpIcon from '@material-ui/icons/EcoSharp';
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp';
import Home from '../components/content/home/Home';
import Ecole from '../components/content/ecole/Ecole';
import SchoolLife from '../components/content/school-life/SchoolLife';
import Classrooms from '../components/content/classrooms/Classrooms';
import Informations from '../components/content/informations/Informations';
import ApelOgec from '../components/content/ApelOgec/ApelOgec';
import Private from '../components/content/private/Private';
import Team from '../components/content/ecole/team/Team'
import Story from '../components/content/ecole/story/Story'
import Projects from '../components/content/ecole/projects/Projects'
import Infrastructures from '../components/content/ecole/infrastructures/Infrastructures'
import Agenda from '../components/content/school-life/agenda/Agenda'
import Cantine from '../components/content/school-life/cantine/Cantine'
import Pastorale from '../components/content/school-life/pastorale/Pastorale'
import Schedule from '../components/content/school-life/schedule/Schedule'
import Nursery from '../components/content/school-life/nursery/Nursery'
import Contacts from '../components/content/informations/Contacts'
import Inscriptions from '../components/content/informations/Inscriptions'
import Blog from '../components/content/classrooms/blog/Blog'
import Primaire from '../components/content/classrooms/primaire/Primaire'
import Maternelle from '../components/content/classrooms/maternelle/Maternelle'

import Ps from '../components/content/classrooms/Ps';
import Ms from '../components/content/classrooms/Ms';
import Gs from '../components/content/classrooms/Gs';
import Ce1 from '../components/content/classrooms/Ce1';
import Ce2 from '../components/content/classrooms/Ce2';
import Cm1 from '../components/content/classrooms/Cm1';
import Cm2 from '../components/content/classrooms/Cm2';
import Apel from '../components/content/ApelOgec/Apel'
import Ogec from '../components/content/ApelOgec/Ogec'
import SubMenuCardGroup from '../components/content/SubMenuCardGroup';

const rubrics = [
    {name: "Acceuil", link: '/', icon: '' , alias: 'home', 
    route : {
        path: '/',
        exact: true,
        component: Home
    },
    subdisplay: false ,
    categories : []},


    {name: "L'Ecole", link: '/ecole', icon: <SchoolIcon fontSize="large" /> , alias:'ecole',
    route : {
        path: '/ecole',
        exact: true,
        component: Ecole
    },
    subdisplay: false ,
    categories: [
        {designation: 'Equipe pedagogique', link: '/ecole/equipe-pedagogique', alias:'ep',
        route : {
            path: '/ecole/equipe-pedagogique',
            exact: true,
            component: Team
        }},
        {designation: 'Histoire', link: '/ecole/histoire', alias:'ht',
        route : {
            path: '/ecole/histoire',
            exact: true,
            component: Story
        }},
        {designation: 'Projets', link: '/ecole/projets', alias:'pj', 
         route : {
            path: '/ecole/projets',
            exact: true,
            component: Projects
        }},
        {designation: 'Infrastructures', link: '/ecole/infrastructures', alias:'if',
        route : {
            path: '/ecole/infrastructures',
            exact: true,
            component: Infrastructures
        }}
    ]},

    {name: "Vie Scolaire", link: '/vie-scolaire', icon: <DirectionsRunIcon  fontSize="large"/>, alias: 'vs',
    route : {
        path: '/vie-scolaire',
        exact: true,
        component: SchoolLife
    }, 
    subdisplay: false ,
    categories: [
        {designation: 'Cantine', link: '/vie-scolaire/cantine', alias:'ct', route:{path: '/vie-scolaire/cantine', exact: true, component: Cantine} },
        {designation: 'Garderie', link: '/vie-scolaire/garderie', alias:'gd', route:{path: '/vie-scolaire/garderie', exact: true, component: Nursery}},
        {designation: 'Horaires', link: '/vie-scolaire/horaires', alias:'hr', route:{path: '/vie-scolaire/horaires', exact: true, component: Schedule}},
        {designation: 'Pastorale', link: '/vie-scolaire/pastorale', alias:'ps', route:{path: '/vie-scolaire/pastorale', exact: true, component: Pastorale}},
        {designation: 'Agenda', link: '/vie-scolaire/agenda', alias:'ag', route:{path: '/vie-scolaire/agenda', exact: true, component: Agenda}},
    ]
},

    {name: "Les classes", link: '/classes', icon: <MeetingRoomIcon fontSize="large" />, alias:'classes',
  
    route : {
        path: '/classes',
        exact: true,
        component: Classrooms
    },
    subdisplay: false,
    categories: [
        {
            designation: 'Maternelle',
            link: '/classes/maternelle',
            alias:'mt', 
            route:{path: '/classes/maternelle', exact: true, component: Maternelle},
            subcategories : [
                {designation: 'Petite Section', link: '/classes/maternelle/petite-section', alias:'ps', route:{path: '/classes/maternelle/petite-section', exact: true, component: SubMenuCardGroup} },
                {designation: 'Moyenne Section', link: '/classes/maternelle/moyenne-section', alias:'ms', route:{path: '/classes/maternelle/moyenne-section', exact: true, component: SubMenuCardGroup} },
                {designation: 'Grande Section', link: '/classes/maternelle/grande-section', alias:'gs', route:{path: '/classes/maternelle/grande-section', exact: true, component: SubMenuCardGroup} },
            ]
        
        },
        {
            designation: 'Primaire', 
            link: '/classes/primaire', 
            alias:'pr', 
            route:{path: '/classes/primaire', exact: true, component: Primaire},
            subcategories: [
                {designation: 'CP', link: '/classes/primaire/cp', alias:'ps', route:{path: '/classes/primaire/cp', exact: true, component: SubMenuCardGroup} },
                {designation: 'CE1', link: '/classes/primaire/ce1', alias:'CE1', route:{path: '/classes/primaire/ce1', exact: true, component: SubMenuCardGroup} },
                {designation: 'CE2', link: '/classes/primaire/ce2', alias:'CE2', route:{path: '/classes/primaire/ce2', exact: true, component: SubMenuCardGroup} },
                {designation: 'CM1', link: '/classes/primaire/cm1', alias:'CM1', route:{path: '/classes/primaire/cm1', exact: true, component: SubMenuCardGroup} },
                {designation: 'CM2', link: '/classes/primaire/cm2', alias:'CM2', route:{path: '/classes/primaire/cm2', exact: true, component: SubMenuCardGroup} },
 
            ]
        
        },
        {designation: 'Ze Blog', link: '/classes/blog', alias:'bl', route:{path: '/classes/blog', exact: true, component: Blog} },
        
    ]      
     },

     
    {name: "Informations", link: '/informations', icon: <MenuBookSharpIcon  fontSize="large" />, alias: 'informations',
    route : {
        path: '/informations',
        exact: true,
        component: Informations
    },
    subdisplay: false ,
    categories: [
        {designation: 'Inscriptions', link: '/informations/inscriptions', alias:'in', route:{path: '/informations/inscriptions', exact: true, component: Inscriptions} },
        {designation: 'Nous contacter', link: '/informations/contacts', alias:'ct', route:{path: '/informations/contacts', exact: true, component: Contacts}},
      
       
    ]      
    },


    {name: "APEL-OGEC", link: '/apel-ogec', icon: <EcoSharpIcon  fontSize="large" />, alias: 'apel-ogec',
    route : {
        path: '/apel-ogec',
        exact: true,
        component: ApelOgec
    },
    subdisplay: false ,
    categories: [
        {designation: 'APEL', link: '/apel-ogec/apel', alias:'ap', route:{path: '/apel-ogec/apel', exact: true, component: Apel} },
        {designation: 'OGEC', link: '/apel-ogec/ogec', alias:'og', route:{path: '/apel-ogec/ogec', exact: true, component: Ogec}},
    ]
    },
    {name: "Espace privé", link: '/private', icon: <AccountCircleIcon  fontSize="large" />, alias:'pr',
    route : {
        path: '/private',
        exact: true,
        component: Private
    },
    subdisplay: false 
    }
]

export default rubrics

// {designation: 'Moyenne Section', link: '/classes/ms', alias:'ms', route:{path: '/classes/ms', exact: true, component: Ms}},
// {designation: 'Grande Section', link: '/classes/gs', alias:'gs', route:{path: '/classes/gs', exact: true, component: Gs}},
// {designation: 'Cours Elementaire 1', link: '/classes/ce1', alias:'ce1', route:{path: '/classes/ce1', exact: true, component: Ce1}},
// {designation: 'Cours Elementaire 2', link: '/classes/ce2', alias:'ce2', route:{path: '/classes/ce2', exact: true, component: Ce2}},
// {designation: 'Cours Moyen 1', link: '/classes/cm1', alias:'cm1', route:{path: '/classes/cm1', exact: true, component: Cm1}},
// {designation: 'Cours Moyen 2', link: '/classes/cm2', alias:'cm2', route:{path: '/classes/cm2', exact: true, component: Cm2}},