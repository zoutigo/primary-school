import React from 'react'
import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress, withStyles } from '@material-ui/core'
import { loginSchema } from '../../../../../utils/forms/validators'

import { apiLogin } from '../../../../../utils/api'

import {
  setToken,
  setCredentials,
  setIsLogged,
  setTokenValidity,
} from '../../../../../redux/user/userActions'
import formStyles from '../../../../../utils/styles'
import ButtonForm from '../../../../../utils/forms/ButtonForm'
import EmailInput from '../../../../../utils/forms/EmailInput'
import PasswordInput from '../../../../../utils/forms/PasswordInput'
import { StyledForm } from '../../../../../utils/forms/styledComponents'

function Login({ classes }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    register,
    errors,
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    const datas = {
      email: data.email,
      password: data.password,
      role: data.role,
    }
    await apiLogin(datas)
      .then((response) => {
        if (response.status === 200) {
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
          history.push({
            pathname: '/informations/actualites',
            state: {
              from: '/register/login',
              rubric: {
                alias: 'private',
              },
            },
          })

          reset()
        }
      })
      .then(() => dispatch(setIsLogged()))

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
      <ButtonForm
        type="submit"
        label={`Je me connecte maintenant`}
        disabled={!isValid ? true : isSubmitting ? true : false}
      />
    </StyledForm>
  )
}

Login.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(formStyles)(Login)
