import React from 'react'
import PropTypes from 'prop-types'
import { apiFetchPaper, apiPostPaper } from '../api'
import Papers from '../papers/Papers'

function Activities({ entity, type, pageName }) {
  const params =
    entity === 'direction' ? `type=${type}` : `type=${type}&entity=${entity}`

  const paper = {
    queryKey: [pageName],
    queryParams: params,
    def: 'activites',
    fetcher: apiFetchPaper,
    poster: apiPostPaper,
    entity: entity,
    type: type,
  }

  return <Papers paper={paper} />
}
Activities.defaultProps = {
  entity: '',
  type: 'activite',
  pageName: 'activites',
}

Activities.propTypes = {
  entity: PropTypes.string,
  type: PropTypes.string,
  pageName: PropTypes.string,
}

export default Activities
