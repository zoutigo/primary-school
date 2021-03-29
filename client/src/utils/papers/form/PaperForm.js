import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, TextField } from '@material-ui/core'
import { makeStyles, styled, useTheme } from '@material-ui/styles'
import moment from 'moment'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker } from '@material-ui/pickers'

import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import BackspaceIcon from '@material-ui/icons/Backspace'

import ButtonComponent from '../../../components/others.js/ButtonComponent'
import { paperSchema } from '../../forms/validators'
import { useUpdateMutationOptions } from '../../hooks'

import { dateToTimeStamp } from '../../dates'
import PageEditor from '../../tinyEditors/PageEditor'
import DatePickerControl from '../../forms/DatePickerControl'

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
  datasformupdate,
  setPaperForm,
  setPaperContent,
  setButtonGroup,
  action,
}) {
  // const { place, date, title } = datasforupdate
  // const initialdate = moment.unix(date)
  // console.log('initialdate', initialdate)
  const [selectedDate, handleDateChange] = useState(new Date())
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
    const { text, title, description, place, date } = datas

    const options = {
      headers: { 'x-access-token': token },
    }

    const requestbody = (definition) => {
      switch (definition) {
        case 'events':
          return {
            title: title,
            description: description,
            date: date.valueOf(),
            place: place,
            text: text,
          }
          break

        default:
          return {}
      }
    }

    console.log('body:', requestbody(def))
    try {
      await mutate({
        id: datasformupdate ? datasformupdate._id : '',
        action: action,
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
            defaultValue={datasformupdate ? datasformupdate.title : ''}
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
          <Controller
            as={TextField}
            name="date"
            control={control}
            label="date de l'évènement"
            className={classes.datepicker}
            type="date"
            defaultValue={
              datasforupdate ? moment(datasforupdate.date).format('DD/MM/YYYY') : ''
            }
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
        </Grid> */}

        {/* <Grid item container>
          <Controller
            as={DatePicker}
            name="date"
            label="Date de l'évènement"
            defaultValue={
              datasformupdate
                ? moment(datasformupdate.date).format('MMMM Do YYYY')
                : moment().format('MMMM Do YYYY')
            }
            control={control}
            onChange={([selected]) => selected}
            // format="MMMM Do YYYY"
            autoOk
            render={() => (
              <DatePicker
                clearable
                disableFuture
                value={selectedDate}
                onChange={handleDateChange}
              />
            )}
          />
        </Grid> */}
        <Grid item container>
          <DatePickerControl
            control={control}
            name="date"
            label="Date de l'évènement"
            initialvalue={datasformupdate ? datasformupdate.date : ''}
          />
        </Grid>

        <Grid item container>
          <Controller
            as={TextField}
            name="place"
            control={control}
            fullWidth
            defaultValue={
              datasformupdate ? datasformupdate.place : 'Ecole Saint Augustin'
            }
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
        <Grid item container>
          <Controller
            name="text"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <PageEditor onChange={onChange} value={value} />
            )}
          />
        </Grid>

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
