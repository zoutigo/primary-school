import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useQuery } from 'react-query'
import { apiFecthPage } from '../../../../utils/api'

function ProjetEducatif() {
  const pageName = 'projet-educatif'

  const { isLoading, isError, data, error } = useQuery(
    ['projet-educatif', { alias: pageName }],
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
  return <div></div>
}

export default ProjetEducatif
