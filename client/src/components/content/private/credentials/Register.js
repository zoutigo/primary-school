import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { apiCheckEmail } from '../../../../utils/api'
import formStyles from '../../../../utils/styles'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'

import TitlePanel from '../../../../utils/TitlePanel'
import { makeStyles, withStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  root: {},
  // form: {
  // '& div': {
  //   margin: '0.5em auto',
  //   display: 'flex',
  //   flexDirection: 'column',
  // },

  //   '& .MuiTextField-root': {
  //     margin: theme.spacing(1),
  //     width: 200,
  //     fontSize: '8em',
  //   },
  // },
}))

const schema = yup.object().shape({
  email: yup
    .string()
    .required('le mail est obligatoire')
    .email(`ce format mail n'est pas valide`)
    .test(
      'is available',
      'ce mail appartient a un utilisateur',
      async (value, context) => (await apiCheckEmail(value).response) === 'true'
    ),
})

function Register(props) {
  const classes = useStyles()
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => console.log(data)

  return (
    <div className={classes.root}>
      <TitlePanel title={'Inscription utilisateur'} />
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={props.classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="votre adresse mail" ref={register} />
          <p>{errors.email?.message}</p>
        </div>
        <Button type="submit" fullWidth variant="outlined" color="primary">
          {' '}
          Je m'inscris{' '}
        </Button>
      </form>
    </div>
  )
}

export default withStyles(formStyles)(Register)
