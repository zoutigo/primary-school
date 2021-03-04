import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import { useQuery } from 'react-query'
import { apiFecthPage } from '../../../../utils/api'
import Wrapper from '../../../wrappers/wrapper/Wrapper'

function Nursery() {
  const pageName = 'garderie'

  const { isLoading, isError, data, error } = useQuery(
    ['garderie', { alias: pageName }],
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

  const NurseryContent = () => <div>{ReactHtmlParser(data[0].text)}</div>

  const pages = [
    {
      title: `LA GARDERIE`,
      content: <NurseryContent />,
    },
  ]
  const datas = { pages }
  return <Wrapper {...datas} />
}

export default Nursery
