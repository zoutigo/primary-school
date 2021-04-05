import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  styled,
  TextField,
  useTheme,
} from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import IconComponent from '../../components/others.js/IconComponent'
import { StyledInputTextFieldControl } from '../componentsStyled'

const StyledUploadTextField = styled(StyledInputTextFieldControl)(() => ({
  '& .MuiInput-root': {
    height: '5rem',
  },
}))

function InputFileControl({ control, name, label, error, onChange, ...rest }) {
  const theme = useTheme()
  const classes = useStyles()
  const {
    field: { ref, ...inputProps },
    meta: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    // rules: { required: false },
  })

  const [attachment, setAttachment] = useState()

  const handleChange = (event) => {
    const files = Array.from(event.target.files)
    const [file] = files
    setAttachment(file)
    if (!!onChange) onChange({ target: { value: file } })
  }

  return (
    <Box
      position="relative"
      height={98}
      color={
        !!error ? theme.palette.error.main : theme.palette.background.paper
      }
      borderBottom={4}
    >
      <Box position="absolute" top={0} bottom={0} left={0} right={0} mx={2}>
        <TextField
          inputRef={ref}
          {...rest}
          {...inputProps}
          className={classes.field}
          InputProps={{ disableUnderline: true }}
          margin="normal"
          fullWidth
          disabled
          label={label}
          // value={attachment?.name || ''}
          error={!!error}
          helperText={error?.message || ' '}
        />
      </Box>
      <ButtonBase
        className={classes.button}
        component="label"
        onKeyDown={(e) => e.keyCode === 32 && ref.current?.click()}
      >
        <input
          ref={ref}
          type="file"
          accept="image/*"
          hidden
          onChange={handleChange}
        />
      </ButtonBase>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  field: {
    boxSizing: 'border-box',
    '& .MuiFormLabel-root.Mui-disabled': {
      color: theme.palette.secondary.main,
    },
  },
  button: {
    width: '4rem',
    height: '2rem',
    overflow: 'hidden',
    background: 'green',
    margin: '0.1rem 0.5rem !important',
    color: 'red',
  },
}))

export default InputFileControl
