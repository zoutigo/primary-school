import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/styles'
import myDatasStyle from './myDatasStyle'
import { Grid, Button } from '@material-ui/core'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'

function MyDatas(props) {
  const id = useSelector((state) => state.user.Credentials.id)
  const url = `http://localhost:3500/users/${id}`

  const query = useQuery(
    'users',
    async () => {
      const result = await fetch(url)
      return result.json()
    }
    // apiFecthUserDatas(id)
  )
  const image = require('../../../../images/rubrics/classes/primary.jpg')

  const handleClick = () => {}

  if (query.isError) {
    return <div> {query.error.message}</div>
  }
  if (query.isLoading) {
    return <div>... is Loading</div>
  }

  console.log('query:', query)
  return (
    <Grid container className={props.classes.root}>
      <Grid item sm={12} md={6}>
        <img src={image} />
      </Grid>
      <Grid item sm={12} md={6} style={{ paddingTop: '1em' }}>
        <div className={props.classes.dataGroup}>
          <div>Nom: </div>
          <div> {query.data && query.data.name}</div>
        </div>
        <div className={props.classes.dataGroup}>
          <div>Prenom: </div>
          <div> Etienne</div>
        </div>
        <div className={props.classes.dataGroup}>
          <div>Email: </div>
          <div> Etienne</div>
        </div>
        <div className={props.classes.dataGroup}>
          <div>Role: </div>
          <div> {query.data && query.data.role}</div>
        </div>
        <div className={props.classes.dataGroup}>
          <div>Date d inscription: </div>
          <div> 16/03/2020</div>
        </div>
        <div className={props.classes.dataGroup}>
          <div>Dernière connexion: </div>
          <div> Etienne</div>
        </div>
        <div className={props.classes.dataGroup}>
          <Button onClick={handleClick}> Actualiser</Button>
        </div>
      </Grid>
    </Grid>
  )
}

MyDatas.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(myDatasStyle)(MyDatas)
