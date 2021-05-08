import React from 'react'
import { apiFetchPaper, apiPostPaper } from '../../../../../utils/api'
import Papers from '../../../../../utils/papers/Papers'

function Breves() {
  const pageName = 'breve'

  const paper = {
    queryKey: [pageName, { type: pageName }],
    queryParams: `type=${pageName}`,
    def: 'file',
    fetcher: apiFetchPaper,
    poster: apiPostPaper,
    type: pageName,
  }
  return <Papers paper={paper} />
}

export default Breves
