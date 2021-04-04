import React from 'react'
import { apiFecthFile, apiPostFile } from '../../../../../utils/api'
import Papers from '../../../../../utils/papers/Papers'

function NewsLetters() {
  const pageName = 'newsletter'

  const paper = {
    queryKey: [pageName, { type: pageName }],
    queryParams: `type=${pageName}`,
    def: 'file',
    fetcher: apiFecthFile,
    poster: apiPostFile,
  }

  return <Papers paper={paper} />
}

export default NewsLetters
