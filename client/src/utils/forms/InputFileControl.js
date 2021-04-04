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

  const [attachment, setAttachment] = useState(null)

  const handleChange = (event) => {
    const files = Array.from(event.target.files)
    const [file] = files
    setAttachment(file)
    if (!!onChange) onChange({ target: { value: file } })
  }

  return (
    <Box style={{ width: '100%', marginBottom: '3rem' }}>
      <input
        {...inputProps}
        ref={ref}
        {...rest}
        accept="image/*"
        id="icon-button-file"
        type="file"
        style={{ display: 'none' }}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <IconComponent
            icon={<CloudUploadIcon style={{ fontSize: 'inherit' }} />}
            costumcolor={theme.palette.secondary.dark}
          />
        </IconButton>
      </label>
    </Box>
  )

  // return (
  //   <TextField
  //     {...rest}
  //     required
  //     inputRef={ref}
  //     type="text"
  //     InputLabelProps={{
  //       shrink: true,
  //     }}
  //   />
  // )
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
