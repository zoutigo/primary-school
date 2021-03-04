import React from 'react'
import { useQuery } from 'react-query'
import ReactHtmlParser from 'react-html-parser'

import { apiFecthPage } from '../../../../utils/api'

function ProjetPedagogique() {
  const pageName = 'projet-pedagogique'

  const { isLoading, isError, data, error } = useQuery(
    ['projet-pedgogique', { alias: pageName }],
    apiFecthPage,
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
    }
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return <div>{ReactHtmlParser(data[0].text)}</div>
}

export default ProjetPedagogique
