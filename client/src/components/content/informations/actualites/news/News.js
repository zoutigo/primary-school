import React from 'react'
import Activities from '../../../../../utils/activities/Activities'

function News() {
  const pageName = 'all-news'
  return <Activities pageName={pageName} entity="direction" type="activity" />
}

export default News
