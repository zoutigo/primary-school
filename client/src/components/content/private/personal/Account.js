import { Typography } from '@material-ui/core'
import React from 'react'
import { useLocation } from 'react-router-dom'
import TitlePanel from '../../../../utils/TitlePanel'

function Account() {
  const location = useLocation()
  console.log('location:', location)
  const { from } = location.state
  console.log('from:', from)
  const WelcomeMessage = () => {
    return (
      <div>
        <Typography variant="h6">Bienvenue</Typography>
        <p>
          Bienvenue sur le site de l'école saint augustin de cremieu. Vous
          pouvez desormais consulter des informations privilégiées
        </p>
      </div>
    )
  }

  return (
    <div>
      <TitlePanel title={'Mon espace'} />
      {from && from === '/private/register' && <WelcomeMessage />}
    </div>
  )
}

export default Account
