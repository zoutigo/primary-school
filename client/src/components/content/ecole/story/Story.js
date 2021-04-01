import React from 'react'

import { apiFecthPage, apiPostPage } from '../../../../utils/api'
import Papers from '../../../../utils/papers/Papers'
import Wrapper from '../../../wrappers/wrapper/Wrapper'

function Story() {
  const pageName = 'histoire'

  const paper = {
    queryKey: [pageName, { alias: pageName }],
    queryParams: `alias=${pageName}`,
    def: 'page',
    fetcher: apiFecthPage,
    poster: apiPostPage,
  }
  const pages = [
    {
      title: `HISTOIRE`,
      content: <Papers paper={paper} />,
    },
  ]
  const datas = { pages }
  return <Wrapper {...datas} />
}

export default Story
