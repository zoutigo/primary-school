import { Grid } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import { apiFecthTeam } from '../../../../utils/api'
import Group from './group/Group'

function Team() {
  const Groups = [
    { department: 'Les enseignants', members: [] },
    { department: 'La direction', members: [] },
  ]
  const [groups, setGroups] = React.useState(Groups)
  const { isLoading, isError, data, error } = useQuery('team', apiFecthTeam)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  console.log(data)
  return (
    <Grid container>
      {data.data.map((group, index) => {
        return (
          <Grid item container key={index}>
            <Group {...group} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Team
