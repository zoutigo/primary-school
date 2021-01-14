import React from 'react'
import ApelOgec from '../components/content/ApelOgec/ApelOgec'
import Ecole from '../components/content/ecole/Ecole'
import Home from '../components/content/home/Home'
import Informations from '../components/content/informations/Informations'
import Private from '../components/content/private/Private'
import Classrooms from '../components/content/classrooms/Classrooms'

import SchoolIcon from '@material-ui/icons/School'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EcoSharpIcon from '@material-ui/icons/EcoSharp'
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp'
import SchoolLife from '../components/content/school-life/SchoolLife'

export const rubricComponents = [
  ['home', Home],
  ['ecole', Ecole, <SchoolIcon fontSize="large" />],
  ['vie-scolaire', SchoolLife, <DirectionsRunIcon fontSize="large" />],
  ['classes', Classrooms, <MeetingRoomIcon fontSize="large" />],
  ['informations', Informations, <MenuBookSharpIcon fontSize="large" />],
  ['apel-ogec', ApelOgec, <EcoSharpIcon fontSize="large" />],
  ['private', Private, <AccountCircleIcon fontSize="large" />],
]
