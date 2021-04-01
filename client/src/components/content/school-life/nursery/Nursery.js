import React from 'react'

import { apiFecthPage, apiPostPage } from '../../../../utils/api'
import Papers from '../../../../utils/papers/Papers'
import Wrapper from '../../../wrappers/wrapper/Wrapper'

function Nursery() {
  const pageName = 'garderie'

  const paper = {
    queryKey: [pageName, { alias: pageName }],
    queryParams: `alias=${pageName}`,
    def: 'page',
    fetcher: apiFecthPage,
    poster: apiPostPage,
  }

  const pages = [
    {
      title: `LA GARDERIE`,
      content: <Papers paper={paper} />,
    },
  ]
  const datas = { pages }
  return <Wrapper {...datas} />
}

export default Nursery
