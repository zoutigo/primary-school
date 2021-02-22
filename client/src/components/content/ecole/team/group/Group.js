import React, { useMemo } from 'react'
import { Grid, withStyles, Box } from '@material-ui/core'
import Department from '../department/Department'
import Member from '../member/Member'

function Group({ department, members }) {
  const Empty = useMemo(() => {
    return withStyles({
      root: {
        width: '32%',
      },
    })(Box)
  }, [])
  const StyledGrid = useMemo(() => {
    return withStyles({
      root: {
        paddingBottom: '3em',
        '& >div:first-child': {
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        },
      },
    })(Grid)
  }, [])

  const fillEmpty = () => {
    const Divs = []
    if (members.length % 3 !== 0 && members.length !== 1) {
      const qty = 3 - (members.length % 3)
      for (let i = 0; i < qty; i++) {
        Divs.push(i)
      }
    }
    return Divs
  }

  return (
    <StyledGrid
      container
      data-testid="team-group"
      display="flex"
      justify="center"
    >
      <Grid item container>
        {' '}
        <Department department={department} />{' '}
      </Grid>
      <Grid item container display="flex" justify="space-around">
        {members &&
          members.map((member, index) => {
            return <Member item {...member} key={index} />
          })}
        {fillEmpty().map((empty, i) => {
          return <Empty key={i} />
        })}
      </Grid>
    </StyledGrid>
  )
}

export default Group
