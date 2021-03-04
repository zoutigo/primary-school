import { Grid } from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'

import React from 'react'
import { useQuery } from 'react-query'
import { apiFecthPage } from '../../../utils/api'
import Wrapper from '../../wrappers/wrapper/Wrapper'

function Apel() {
  const pageName = 'apel'

  const { isLoading, isError, data, error } = useQuery(
    ['apel', { alias: pageName }],
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

  const ApelContent = () => <div>{ReactHtmlParser(data[0].text)}</div>

  const pages = [
    {
      title: `L'APEL`,
      content: <ApelContent />,
    },
  ]
  const datas = { pages }
  return <Wrapper {...datas} />
}

export default Apel
