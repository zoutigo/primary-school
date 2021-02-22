import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'
import React from 'react'
import { useLocation } from 'react-router'
import styles from './styles'

const PasswordInput = React.forwardRef(({ classes, errors, ...rest }, ref) => {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  })

  const handleChangePassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const { name } = rest
  const ErrorMessage =
    name === 'password'
      ? errors && errors.password?.message
      : errors && errors.passwordConfirm?.message

  return (
    <section
      id="text-field-box2"
      data-testid="password-input"
      className={classes.textfield}
    >
      <TextField
        {...rest}
        required
        inputRef={ref}
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChangePassword('password')}
        helperText={
          errors.password?.message ||
          'Minimum 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre'
        }
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <span>{ErrorMessage}</span>
    </section>
  )
})

export default withStyles(styles)(PasswordInput)
