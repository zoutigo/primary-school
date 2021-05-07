import React from 'react'
import { apiFecthFile, apiPostFile } from '../../../../../utils/api'
import Papers from '../../../../../utils/papers/Papers'

function CanteenMenus() {
  const pageName = 'menu'

  const paper = {
    queryKey: [pageName, { type: pageName }],
    queryParams: `type=${pageName}`,
    def: 'file',
    fetcher: apiFecthFile,
    poster: apiPostFile,
    type: 'menu',
  }
  return <Papers paper={paper} />
}

export default CanteenMenus
