import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { apiCheckEmail, apiRegister } from '../../../../utils/api'
import formStyles from '../../../../utils/styles'

import TitlePanel from '../../../../utils/TitlePanel'
import { makeStyles, withStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  setToken,
  setCredentials,
  setIsLogged,
  setTokenValidity,
} from '../../../../redux/user/userActions'
import { testSettings } from '../../../../redux/settings/settingsActions'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '2em',
    position: 'relative',
  },
  circularContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
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
    .required('Veillez confirmer le mot de pass'),

  role: yup.string().required('veillez indiquer votre role'),
})

function Register(props) {
  const dispatch = useDispatch()

  const classes = useStyles()
  const {
    register,
    errors,
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    const datas = {
      email: data.email,
      password: data.password,
      role: data.role,
    }
    await apiRegister(datas)
      .then((response) => {
        if (response.status === 201) {
          const Token = response.headers['x-access-token']
          const splittedToken = Token.split('.')
          const tokenDatas = JSON.parse(atob(splittedToken[1]))
          dispatch(testSettings('toto'))
          dispatch(
            setCredentials({
              role: tokenDatas.role,
              id: tokenDatas._id,
            })
          )
          dispatch(setToken(Token))
          dispatch(setTokenValidity(true))

          // show a welcome message
          reset()
        }
      })
      .then(() => dispatch(setIsLogged()))

      .catch((err) => {
        console.log('error:', err)
      })
  }

  return (
    <div className={classes.root}>
      <TitlePanel title={'Inscription utilisateur'} />
      {isSubmitting && (
        <div className={classes.circularContainer}>
          <CircularProgress />
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={props.classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="mocha@gmail.fr"
            disabled={isSubmitting}
            ref={register}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div className={props.classes.formGroup}>
          <label htmlFor="password">Mot de pass</label>
          <input
            name="password"
            placeholder="Cantique8715"
            disabled={isSubmitting}
            ref={register}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div className={props.classes.formGroup}>
          <label htmlFor="passwordConfirm">Confirmer le mot de pass</label>
          <input
            name="passwordConfirm"
            placeholder="Exactement"
            disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  ref={register}
                />
                <label>Parent</label>
              </div>
              <div>
                <input
                  type="radio"
                  value={'enseignant'}
                  name="role"
                  disabled={isSubmitting}
                  ref={register}
                />
                <label>Enseignant</label>
              </div>
            </div>
          </div>
        </div>

        <Button
          disabled={!isValid || isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
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
