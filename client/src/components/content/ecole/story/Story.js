import React from 'react'
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser'
import { useQuery } from 'react-query'
import { apiFecthPage } from '../../../../utils/api'
import Wrapper from '../../../wrappers/wrapper/Wrapper'

function Story() {
  const pageName = 'histoire'

  const { isLoading, isError, data, error } = useQuery(
    ['histoire', { alias: pageName }],
    apiFecthPage,
    {
      retry: 1,
      retryDelay: 500,
    }
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    console.log('error', error)
    return <span>Error: {error.message}</span>
  }

  const StoryContent = () => <div>{ReactHtmlParser(data[0].text)}</div>

  const pages = [
    {
      title: `HISTOIRE`,
      content: <StoryContent />,
    },
  ]
  const datas = { pages }
  return <Wrapper {...datas} />
}

export default Story
