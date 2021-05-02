import React from 'react'
import { apiFetchPaper, apiPostPaper } from '../../../../../utils/api'
import Papers from '../../../../../utils/papers/Papers'

function Activities() {
  const pageName = 'activites'

  const paper = {
    queryKey: [pageName],
    queryParams: `type=activity`,
    def: pageName,
    fetcher: apiFetchPaper,
    poster: apiPostPaper,
    entity: 'direction',
  }

  return <Papers paper={paper} />
}

export default Activities
