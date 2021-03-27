import React from 'react'
import Icon from '@material-ui/core/Icon'
import { loadCSS } from 'fg-loadcss'

function FontAwesomeIcon({ faclass }) {
  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css')
    )

    return () => {
      node.parentNode.removeChild(node)
    }
  }, [])
  return (
    <Icon
      className={faclass}
      style={{
        fontSize: 'inherit',
        color: 'inherit',
        marginLeft: '8px',
        marginRight: '10px',
      }}
    />
  )
}

export default FontAwesomeIcon
