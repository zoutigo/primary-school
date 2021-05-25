import React from 'react'

import SchoolIcon from '@material-ui/icons/School'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EcoSharpIcon from '@material-ui/icons/EcoSharp'
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp'

import Informations from '../components/content/informations/Informations'
import ApelOgec from '../components/content/ApelOgec/ApelOgec'
import Private from '../components/content/private/Private'
import Team from '../components/content/ecole/team/Team'
import Story from '../components/content/ecole/story/Story'
import Projects from '../components/content/ecole/projects/Projects'
import Infrastructures from '../components/content/ecole/infrastructures/Infrastructures'
import Cantine from '../components/content/school-life/cantine/Cantine'
import Schedule from '../components/content/school-life/schedule/Schedule'
import Nursery from '../components/content/school-life/nursery/Nursery'
import Classroom from '../components/content/classrooms/classroomTemplate/Classroom'

import Login from '../components/content/private/credentials/login/Login'
import Register from '../components/content/private/credentials/register/Register'
import Contacts from '../components/content/informations/contacts/Contacts'
import Inscriptions from '../components/content/informations/inscriptions/Inscriptions'
import Actualites from '../components/content/informations/actualites/Actualites'
import Apel from '../components/content/ApelOgec/apel/Apel'
import Ogec from '../components/content/ApelOgec/ogec/Ogec'

const rubrics = [
  {
    name: 'Acceuil',
    link: '/',
    icon: '',
    alias: 'home',
    route: {
      path: '/',
      exact: true,
    },
    subdisplay: false,

    categories: [],
  },

  {
    name: "L'Ecole",
    link: '/ecole',
    icon: <SchoolIcon fontSize="large" />,
    alias: 'ecole',
    route: {
      path: '/ecole',
      exact: true,
    },
    subdisplay: false,

    categories: [
      {
        designation: 'Equipe pedagogique',
        link: '/ecole/equipe-pedagogique',
        alias: 'ep',
        route: {
          path: '/ecole/equipe-pedagogique',
          exact: true,
          component: Team,
        },
      },
      {
        designation: 'Histoire',
        link: '/ecole/histoire',
        alias: 'ht',
        route: {
          path: '/ecole/histoire',
          exact: true,
          component: Story,
        },
      },
      {
        designation: 'Projets',
        link: '/ecole/projets',
        alias: 'pj',
        route: {
          path: '/ecole/projets',
          exact: true,
          component: Projects,
        },
      },
      {
        designation: 'Infrastructures',
        link: '/ecole/infrastructures',
        alias: 'if',
        route: {
          path: '/ecole/infrastructures',
          exact: true,
          component: Infrastructures,
        },
      },
    ],
  },

  {
    name: 'Vie Scolaire',
    link: '/vie-scolaire',
    icon: <DirectionsRunIcon fontSize="large" />,
    alias: 'vie-scolaire',
    route: {
      path: '/vie-scolaire',
      exact: true,
    },
    subdisplay: false,

    categories: [
      {
        designation: 'Cantine',
        link: '/vie-scolaire/cantine',
        alias: 'cantine',
        route: {
          path: '/vie-scolaire/cantine',
          exact: true,
          component: Cantine,
        },
      },
      {
        designation: 'Garderie',
        link: '/vie-scolaire/garderie',
        alias: 'gd',
        route: {
          path: '/vie-scolaire/garderie',
          exact: true,
          component: Nursery,
        },
      },
      {
        designation: 'Horaires',
        link: '/vie-scolaire/horaires',
        alias: 'hr',
        route: {
          path: '/vie-scolaire/horaires',
          exact: true,
          component: Schedule,
        },
      },
    ],
  },

  {
    name: 'Les classes',
    link: '/classes',
    icon: <MeetingRoomIcon fontSize="large" />,
    alias: 'classes',

    route: {
      path: '/classes',
      exact: true,
    },
    subdisplay: false,
    categories: [
      {
        designation: 'Petite section',
        link: '/classes/petite-section',
        alias: 'ps',
        route: {
          path: '/classes/petite-section',
          exact: true,
          component: Classroom,
        },
      },
      {
        designation: 'Moyenne section',
        link: '/classes/moyenne-section',
        alias: 'ms',
        route: {
          path: '/classes/moyenne-section',
          exact: true,
          component: Classroom,
        },
      },
      {
        designation: 'Grande section',
        link: '/classes/grande-section',
        alias: 'gs',
        route: {
          path: '/classes/grande-section',
          exact: true,
          component: Classroom,
        },
      },
      {
        designation: 'CP',
        link: '/classes/cp',
        alias: 'cp',
        route: {
          path: '/classes/cp',
          exact: true,
          component: Classroom,
        },
      },
      {
        designation: 'CE1',
        link: '/classes/ce1',
        alias: 'ce1',
        route: {
          path: '/classes/ce1',
          exact: true,
          component: Classroom,
        },
      },
      {
        designation: 'CE2',
        link: '/classes/ce2',
        alias: 'ce2',
        route: {
          path: '/classes/ce2',
          exact: true,
          component: Classroom,
        },
      },
      {
        designation: 'CM1',
        link: '/classes/cm1',
        alias: 'cm1',
        route: {
          path: '/classes/cm1',
          exact: true,
          component: Classroom,
        },
      },
      {
        designation: 'CM2',
        link: '/classes/cm2',
        alias: 'cm2',
        route: {
          path: '/classes/cm2',
          exact: true,
          component: Classroom,
        },
      },
    ],
  },

  {
    name: 'Informations',
    link: '/informations',
    icon: <MenuBookSharpIcon fontSize="large" />,
    alias: 'informations',
    route: {
      path: '/informations',
      exact: true,
      component: Informations,
    },
    subdisplay: false,
    categories: [
      {
        designation: 'Inscriptions',
        link: '/informations/inscriptions',
        alias: 'in',
        route: {
          path: '/informations/inscriptions',
          exact: true,
          component: Inscriptions,
        },
      },
      {
        designation: 'Nous contacter',
        link: '/informations/contacts',
        alias: 'ct',
        route: {
          path: '/informations/contacts',
          exact: true,
          component: Contacts,
        },
      },
      {
        designation: 'Actualités',
        link: '/informations/actualites',
        alias: 'actu',
        route: {
          path: '/informations/actualites',
          exact: true,
          component: Actualites,
        },
      },
    ],
  },

  {
    name: 'APEL-OGEC',
    link: '/apel-ogec',
    icon: <EcoSharpIcon fontSize="large" />,
    alias: 'apel-ogec',
    route: {
      path: '/apel-ogec',
      exact: true,
      component: ApelOgec,
    },
    subdisplay: false,
    categories: [
      {
        designation: 'APEL',
        link: '/apel-ogec/apel',
        alias: 'ap',
        route: { path: '/apel-ogec/apel', exact: false, component: Apel },
        // chapters: [
        //   {
        //     designation: 'APEL SUMMARY',
        //     link: '/apel-ogec/apel/summary',
        //     alias: 'apel',
        //     route: {
        //       path: '/apel-ogec/apel/summary',
        //       exact: true,
        //       component: Apel,
        //     },
        //   },
        // ],
      },
      {
        designation: 'OGEC',
        link: '/apel-ogec/ogec',
        alias: 'og',
        route: { path: '/apel-ogec/ogec', exact: true, component: Ogec },
      },
    ],
  },
  {
    name: 'Espace privé',
    link: '/private',
    icon: <AccountCircleIcon fontSize="large" />,
    alias: 'private',
    route: {
      path: '/private',
      component: Private,
      exact: true,
    },
    subdisplay: false,
    categories: [
      {
        designation: 'Login',
        link: '/private/login',
        alias: 'login',
        route: { path: '/private/login', exact: true, component: Login },
      },
      {
        designation: 'Inscription',
        link: '/private/register',
        alias: 'register',
        route: { path: '/private/register', exact: true, component: Register },
      },
      {
        designation: 'Mon Espace',
        link: '/private/account',
        alias: 'account',
        route: { path: '/private/account', component: Private },
      },
      {
        designation: 'Se Deconnecter',
        link: '/apel-ogec/ogec',
        alias: 'loggout',
        route: { path: '/apel-ogec/ogec', exact: true, component: Ogec },
      },
    ],
  },
]

export default rubrics
