import React from 'react'

function Account(props) {
  const { previousPage } = props

  return (
    <div>
      <div>Espace membre</div>
      {previousPage === 'register' && <div>Bienvenue sur le site</div>}
    </div>
  )
}

export default Account
