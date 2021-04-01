import React from 'react'

import { apiFecthPage, apiPostPage } from '../../../../utils/api'
import Papers from '../../../../utils/papers/Papers'

function ProjetPedagogique() {
  const pageName = 'projet-pedagogique'

  const paper = {
    queryKey: [pageName, { alias: pageName }],
    queryParams: `alias=${pageName}`,
    def: 'page',
    fetcher: apiFecthPage,
    poster: apiPostPage,
  }

  return <Papers paper={paper} />
}

export default ProjetPedagogique
