import React from 'react'
import { useForm } from 'react-hook-form'

import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { apiCheckEmail, apiRegister } from '../../../../../utils/api'

import {
  setToken,
  setCredentials,
  setIsLogged,
  setTokenValidity,
} from '../../../../../redux/user/userActions'

import { CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import formStyles from '../../../../../utils/styles'
import ButtonForm from '../../../../../utils/forms/ButtonForm'
import EmailInput from '../../../../../utils/forms/EmailInput'
import PasswordInput from '../../../../../utils/forms/PasswordInput'
import { StyledForm } from '../../../../../utils/forms/styledComponents'

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
})

function Register({ classes }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { state } = useLocation()

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

          dispatch(
            setCredentials({
              role: tokenDatas.role,
              id: tokenDatas._id,
            })
          )
          dispatch(setToken(Token))
          dispatch(setTokenValidity(true))

          reset()
          dispatch(setIsLogged())
        }
      })
      .then(() =>
        history.push({
          pathname: '/private',
          state: {
            from: '/private/register',
            rubric: {
              name: state.rubric.name,
              alias: state.rubric.alias,
            },
          },
        })
      )

      .catch((err) => {
        console.log('error:', err)
      })
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {isSubmitting && (
        <div className={classes.circularContainer}>
          <CircularProgress />
        </div>
      )}
      <EmailInput
        name="email"
        autoFocus
        ref={register}
        label="Email"
        error={errors.email ? true : false}
        errors={errors}
      />
      <PasswordInput
        name="password"
        ref={register}
        label="Mot de passe"
        error={errors.password ? true : false}
        errors={errors}
      />
      <PasswordInput
        name="passwordConfirm"
        ref={register}
        label="Mot de passe"
        error={errors.passwordConfirm ? true : false}
        errors={errors}
      />

      <ButtonForm
        type="submit"
        label={`Je me connecte maintenant`}
        disabled={!isValid ? true : isSubmitting ? true : false}
      />
    </StyledForm>
  )
}

export default withStyles(formStyles)(Register)
