import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React from 'react'

import { useQuery } from 'react-query'
import { apiFecthTeam } from '../../../../utils/api'
import Wrapper from '../../../wrappers/wrapper/Wrapper'
import Group from './group/Group'

const styles = () => ({
  root: {
    paddingTop: '3em',
  },
})

function Team() {
  const { isLoading, isError, data, error } = useQuery('team', apiFecthTeam)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const TeamContent = withStyles(styles)(({ classes, data }) => (
    <Grid container className={classes.root}>
      {data.data.map((group, index) => {
        return <Group {...group} key={index} />
      })}
    </Grid>
  ))

  const pages = [
    {
      title: `L'équipe pédagogique`,
      content: <TeamContent data={data} />,
    },
  ]

  const datas = { pages }
  return <Wrapper {...datas} />
}

export default Team
