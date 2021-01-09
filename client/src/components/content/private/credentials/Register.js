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
  root: {
    marginBottom: '2em',
  },
}))
const passRegExp = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')

const schema = yup.object().shape({
  email: yup
    .string()
    .required('le mail est obligatoire')
    .email(`ce format mail n'est pas valide`)
    .test(
      'emailExists',
      'ce mail appartient a un utilisateur',
      async (value) => (await apiCheckEmail(value)) === true
    ),
  password: yup
    .string()
    .required('le mot de pass est obligatoire')
    .matches(passRegExp, 'Mot de pass non valide'),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mauvaise correspondance')
    .required('Required'),
})

function Register(props) {
  const classes = useStyles()
  const { register, errors, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })
  const { isDirty, isValid } = formState

  const onSubmit = (data) => console.log(data)

  React.useEffect(() => {
    console.log('isValid', isValid)
  }, [formState])

  return (
    <div className={classes.root}>
      <TitlePanel title={'Inscription utilisateur'} />
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={props.classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="mocha@gmail.fr" ref={register} />
          <p>{errors.email?.message}</p>
        </div>
        <div className={props.classes.formGroup}>
          <label htmlFor="password">Mot de pass</label>
          <input name="password" placeholder="Cantique8715" ref={register} />
          <p>{errors.password?.message}</p>
        </div>
        <div className={props.classes.formGroup}>
          <label htmlFor="passwordConfirm">Confirmer le mot de pass</label>
          <input
            name="passwordConfirm"
            placeholder="Exactement"
            ref={register}
          />
          <p>{errors.passwordConfirm?.message}</p>
        </div>
        <div className={props.classes.formGroup}>
          <div>
            <label htmlFor="role">Role :</label>
            <div>
              <div>
                <input
                  type="radio"
                  value={'parent'}
                  name="role"
                  ref={register}
                  checked
                />
                <label>Parent</label>
              </div>
              <div>
                <input
                  type="radio"
                  value={'enseignant'}
                  name="role"
                  ref={register}
                />
                <label>Enseignant</label>
              </div>
            </div>
          </div>
        </div>

        <Button
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
        >
          {' '}
          Je m'inscris{' '}
        </Button>
      </form>
    </div>
  )
}

export default withStyles(formStyles)(Register)
