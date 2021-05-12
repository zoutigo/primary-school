import React from 'react'
import Activities from '../../../../../utils/activities/Activities'

function ActivitesEcole() {
  const pageName = 'activites-ecole'
  return <Activities pageName={pageName} entity="direction" type="activite" />
}

export default ActivitesEcole
