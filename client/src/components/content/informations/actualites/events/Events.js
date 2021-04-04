import React from 'react'
import { apiFetchEvents, apiPostEvents } from '../../../../../utils/api'
import Papers from '../../../../../utils/papers/Papers'

function Events() {
  const pageName = 'events'

  const paper = {
    queryKey: [pageName],
    queryParams: '',
    def: pageName,
    fetcher: apiFetchEvents,
    poster: apiPostEvents,
  }
  return <Papers paper={paper} />
}

export default Events
