import React from 'react'
import { withStyles } from '@material-ui/styles'
import myDatasStyle from './myDatasStyle'
import { Grid, Paper } from '@material-ui/core'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { apiFecthMyDatas } from '../../../../utils/api'

function MyDatas(props) {
  const id = useSelector((state) => state.user.id)
  const { isLoading, isError, data, error } = useQuery(
    'MyDatas',
    apiFecthMyDatas()
  )
  const image = require('../../../../images/rubrics/classes/primary.jpg')
  if (isLoading) {
    return <div>... is loading</div>
  }
  if (isError) {
    return <div> {error}</div>
  }

  console.log(data)
  return (
    <Grid container className={props.classes.root}>
      <Grid item sm={12} md={6}>
        <img src={image} />
      </Grid>
      <Grid item sm={12} md={6} style={{ paddingTop: '1em' }}>
        <div className={props.classes.dataGroup}>
          <div>Nom: </div>
          <div> Minet</div>
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
          <div> enseignant</div>
        </div>
        <div className={props.classes.dataGroup}>
          <div>Date d'inscription: </div>
          <div> 16/03/2020</div>
        </div>
        <div className={props.classes.dataGroup}>
          <div>Dernière connexion: </div>
          <div> Etienne</div>
        </div>
      </Grid>
    </Grid>
  )
}

export default withStyles(myDatasStyle)(MyDatas)
