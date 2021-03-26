import React from 'react'
import { apiFetchEvents, apiPostEvents } from '../../../../../utils/api'
import Papers from '../../../../../utils/papers/Papers'

function Events() {
  const paper = {
    queryKey: ['events'],
    queryParams: '',
    def: 'events',
    fetcher: apiFetchEvents,
    poster: apiPostEvents,
  }
  return <Papers paper={paper} />
}

export default Events
