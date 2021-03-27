import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, TextField } from '@material-ui/core'
import { makeStyles, styled, useTheme } from '@material-ui/styles'
import moment from 'moment'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'

import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import BackspaceIcon from '@material-ui/icons/Backspace'

import ButtonComponent from '../../../components/others.js/ButtonComponent'
import { paperSchema } from '../../forms/validators'
import { useUpdateMutationOptions } from '../../hooks'
import DatePicker from './DatePicker'
import { dateToTimeStamp } from '../../dates'

const useStyles = makeStyles({
  input: {
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    bordeRadius: '4px',
    border: '1px solid white',
    padding: '10px 15px',
    marginBottom: '10px',
    fontSize: '14px',
  },
  label: {
    lineHeight: 2,
    textAlign: 'left',
    display: 'block',
    marginBottom: '13px',
    marginTop: '20px',
    color: 'white',
    fontSize: '14px',
    fontWeight: 200,
  },
})

const PaperStyledForm = styled('form')(({ theme, bgcolor }) => ({
  boxSizing: 'border-box',
  '& >div': {
    width: '100%',
    '& >div': {
      // background: 'yellow',
      width: '100%',
      padding: '1rem 0px !important',
    },
  },
}))

function PaperForm({
  paper: { queryKey, poster, def },
  setPaperForm,
  setPaperContent,
  setButtonGroup,
}) {
  const theme = useTheme()
  const token = useSelector((state) => state.user.Token.token)
  const classes = useStyles()
  const {
    mutate,
    error: mutationerror,
    isError: isMutationError,
    isSuccess: isMutationSuccess,
  } = useMutation(poster, useUpdateMutationOptions(queryKey))

  const {
    register,
    control,
    errors,
    setValue,
    handleSubmit,
    formState: { isValid, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    // mode: 'onChange',
    //   resolver: yupResolver(paperSchema),
  })

  const onSubmit = async (datas) => {
    console.log('datas', datas)
    const { text, title, description, place, date } = datas
    const options = {
      headers: { 'x-access-token': token },
    }
    console.log(moment(date).unix)
    const requestbody = (definition) => {
      switch (definition) {
        case 'events':
          return {
            title: title,
            description: description,
            date: dateToTimeStamp(date),
            place: place,
          }
          break

        default:
          return {}
      }
    }
    try {
      await mutate({
        id: '',
        options: options,
        body: requestbody(def),
      })
    } catch (err) {
      console.log('error:', err)
    }
  }

  // close the form
  React.useEffect(() => {
    if (isMutationSuccess) {
      setPaperForm(false)
      setPaperContent(true)
      setButtonGroup(true)
    }
  }, [isMutationSuccess])

  return (
    <PaperStyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item container alignItems="center">
          <ButtonComponent
            disabled={isSubmitting}
            icon={<BackspaceIcon />}
            background={theme.palette.info.main}
            width={'200px'}
            text={'retour'}
            onClick={() => {
              setPaperForm(false)
              setPaperContent(true)
              setButtonGroup(true)
            }}
          />
        </Grid>
        <Grid item container>
          <Controller
            as={TextField}
            name="title"
            control={control}
            fullWidth
            defaultValue=""
            helperText="Full width!"
            label="Titre:"
            render={() => (
              <TextField
                id="standard-full-width"
                style={{ margin: '8px', minHeight: '3rem' }}
                margin="normal"
                InputLabelProps={{
                  shrink: false,
                }}
              />
            )}
          />
        </Grid>
        {/* <Grid item container>
          <label className={classes.label}>React Datepicker</label>
          <Controller
            as={ReactDatePicker}
            control={control}
            valueName="selected" // DateSelect value's name is selected
            onChange={([selected]) => selected}
            name="ReactDatepicker"
            className="input"
            placeholderText="Select date"
            className={classes.input}
          />
        </Grid> */}
        <Grid item container>
          <Controller
            as={TextField}
            name="date"
            control={control}
            label="date de l'évènement"
            className={classes.datepicker}
            type="date"
            defaultValue="2017-05-24"
            onChange={([selected]) => selected}
            render={() => (
              <TextField
                id="date-picker"
                margin="normal"
                InputLabelProps={{
                  shrink: false,
                }}
              />
            )}
          />
        </Grid>
        <Grid item container>
          <Controller
            as={TextField}
            name="place"
            control={control}
            fullWidth
            defaultValue=""
            helperText="Full width!"
            label="Lieu:"
            render={() => (
              <TextField
                id="event-place"
                style={{ margin: '8px', minHeight: '3rem' }}
                margin="normal"
                InputLabelProps={{
                  shrink: false,
                }}
              />
            )}
          />
        </Grid>
        {/* <Grid item container>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid> */}

        <Grid item container alignItems="center" justify="flex-end">
          <ButtonComponent
            type={'submit'}
            disabled={isSubmitting}
            icon={<BackspaceIcon />}
            background={theme.palette.success.main}
            width={'300px'}
            text={'Je poste mon évènement'}
          />
          {/* <Button type="submit">Soumettre</Button> */}
        </Grid>
      </Grid>
    </PaperStyledForm>
  )
}

export default PaperForm