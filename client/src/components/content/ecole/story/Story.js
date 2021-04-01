import React from 'react'
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser'
import { useQuery } from 'react-query'
import { apiFecthPage, apiPostPage } from '../../../../utils/api'
import Papers from '../../../../utils/papers/Papers'
import Wrapper from '../../../wrappers/wrapper/Wrapper'

function Story() {
  const pageName = 'histoire'

  const paper = {
    queryKey: ['histoire', { alias: 'histoire' }],
    queryParams: `alias=histoire`,
    def: 'page',
    fetcher: apiFecthPage,
    poster: apiPostPage,
  }
  const pages = [
    {
      title: `HISTOIRE`,
      content: <Papers paper={paper} />,
      // content: <StoryContent />,
    },
  ]
  const datas = { pages }
  return <Wrapper {...datas} />
}

export default Story
