import React from 'react'
import { apiFecthPage, apiPostPage } from '../../../../utils/api'
import Papers from '../../../../utils/papers/Papers'

function OgecContent() {
  const pageName = 'ogec'
  const paper = {
    queryKey: [pageName, { alias: pageName }],
    queryParams: `alias=${pageName}`,
    def: 'page',
    fetcher: apiFecthPage,
    poster: apiPostPage,
  }

  return <Papers paper={paper} />
}

export default OgecContent
