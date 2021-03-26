import { Box } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'

const StyledController = styled(Controller)(() => ({
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  bordeRadius: '4px',
  border: '1px solid white',
  padding: '10px 15px',
  marginBottom: '10px',
  fontSize: '14px',
}))

function DatePicker({ control, placeholderText, ...rest }) {
  return (
    <StyledController
      as={ReactDatePicker}
      control={control}
      valueName="selected" // DateSelect value's name is selected
      onChange={([selected]) => selected}
      placeholderText={placeholderText}
      {...rest}
    />
  )
}

export default DatePicker
