import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, TextField } from '@material-ui/core'
import { makeStyles, styled, useTheme } from '@material-ui/styles'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import BackspaceIcon from '@material-ui/icons/Backspace'

import ButtonComponent from '../../../components/others.js/ButtonComponent'
import { paperSchema } from '../../forms/validators'
import {
  useDispatchOnMount,
  useDispatchOnMutation,
  useDispatchOnUnmount,
  useUpdateMutationOptions,
} from '../../hooks'

import {
  setCurrentPaperItem,
  setFormAction,
  setShowPapersForm,
  setShowPapersInnerForm,
  setShowPapersItems,
  setShowPapersList,
} from '../../../redux'
import { requestbody } from './formutils'
import PagesFields from './fields/PagesFields'
import EventsFields from './fields/EventsFields'
import FilesFields from './fields/FilesFields'

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

function PaperForm({ paper: { queryKey, poster, def } }) {
  const dispatch = useDispatch()
  const {
    formAction: action,
    currentPaperItem: { datas: currentDatas },
  } = useSelector((state) => state.papers)
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
    const options = {
      headers: { 'x-access-token': token },
    }

    console.log('datas:', requestbody(def, datas))

    try {
      await mutate({
        id: currentDatas ? currentDatas._id : '',
        action: action,
        options: options,
        body: requestbody(def, datas),
      })
    } catch (err) {
      console.log('error:', err)
      dispatch(setCurrentPaperItem({ datas: currentDatas, index: 0 }))
    }
  }

  // close the form if successfull mutation

  useDispatchOnMutation(isMutationSuccess, setShowPapersList, true)
  useDispatchOnMutation(isMutationSuccess, setShowPapersForm, false)
  useDispatchOnMutation(isMutationSuccess, setShowPapersItems, true)
  useDispatchOnMutation(isMutationSuccess, setShowPapersInnerForm, false)
  useDispatchOnMutation(isMutationSuccess, setFormAction, '')
  // Hide papers items on form mount

  useDispatchOnMount(setShowPapersItems, false)

  // close form on unmount
  useDispatchOnUnmount(setShowPapersForm, false)
  useDispatchOnUnmount(setShowPapersList, true)
  useDispatchOnUnmount(setShowPapersItems, true)
  useDispatchOnUnmount(setFormAction, '')

  return (
    <PaperStyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        {action === 'create' && (
          <Grid item container alignItems="center">
            <ButtonComponent
              disabled={isSubmitting}
              icon={<BackspaceIcon />}
              background={theme.palette.info.main}
              width={'200px'}
              text={'retour'}
              onClick={() => {
                dispatch(setShowPapersForm(false))
                dispatch(setShowPapersList(true))
                dispatch(setShowPapersItems(true))
              }}
            />
          </Grid>
        )}
        {def === 'page' && (
          <PagesFields control={control} initialdatas={currentDatas} />
        )}
        {def === 'events' && (
          <EventsFields control={control} initialdatas={currentDatas} />
        )}
        {def === 'file' && (
          <FilesFields control={control} initialdatas={currentDatas} />
        )}
        <Grid item container>
          <label htmlFor="file">Select a Photo</label>
          <input type="file" id="file-upload" name="file" ref={register} />
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
        </Grid>
      </Grid>
    </PaperStyledForm>
  )
}

export default PaperForm
