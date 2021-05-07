import { Grid, styled, useTheme } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import BackspaceIcon from '@material-ui/icons/Backspace'
import DatePickerControl from '../../forms/DatePickerControl'
import InputTextControl from '../../forms/InputTextControl'
import PageEditor from '../../tinyEditors/PageEditor'
import {
  useDispatchOnMount,
  useDispatchOnUnmount,
  useDispatchOnMutation,
  useDispatchPaperFormMutation,
  useUpdateMutationOptions,
} from '../../hooks'
import requestbody from './requestbody'
import {
  setCurrentPaperItem,
  setFormAction,
  setShowPapersForm,
  setShowPapersInnerForm,
  setShowPapersItems,
  setShowPapersList,
} from '../../../redux'
import ButtonComponent from '../../../components/others.js/ButtonComponent'

const StyledForm = styled('form')(() => ({
  width: '100%',
}))

function EventsForm({ initialdatas, def, poster, queryKey }) {
  const token = useSelector((state) => state.user.Token.token)
  const { formAction: action, currentPaperItem } = useSelector(
    (state) => state.papers
  )
  const currentDatas = !currentPaperItem ? null : currentPaperItem.datas

  const dispatch = useDispatch()
  const { mutate, error, isError, isSuccess: isMutationSuccess } = useMutation(
    poster,
    useUpdateMutationOptions(queryKey)
  )
  const theme = useTheme()
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({})

  const onSubmit = async (datas) => {
    const options = {
      headers: { 'x-access-token': token },
    }
    const finalDatas = requestbody(def, datas)

    try {
      await mutate({
        id: currentDatas && action !== 'create' ? currentDatas._id : '',
        action: action,
        options: options,
        body: finalDatas,
      })
    } catch (err) {
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

  // useDispatchPaperFormMutation(
  //   [isMutationSuccess],
  //   [
  //     [setShowPapersList, true],
  //     [setShowPapersForm, false],
  //     [setShowPapersItems, true],
  //     [setShowPapersInnerForm, false],
  //     [setFormAction, ''],
  //   ],
  //   [
  //     [setShowPapersList, true],
  //     [setShowPapersForm, false],
  //     [setShowPapersItems, true],
  //     [setFormAction, ''],
  //   ]
  // )

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item container>
          <InputTextControl
            name="title"
            control={control}
            initialvalue={
              initialdatas && action === 'update' ? initialdatas.title : ''
            }
            helperText="au moins 10 caractères"
            label="Titrememnt"
            width="100%"
          />
        </Grid>
        <Grid item container>
          <InputTextControl
            name="place"
            control={control}
            initialvalue={
              initialdatas && action === 'update'
                ? initialdatas.place
                : 'Ecole Saint Augustin'
            }
            helperText="au moins 10 caractères"
            label="Lieu de l'évènement"
            width="50%"
          />
        </Grid>
        <Grid item container>
          <DatePickerControl
            control={control}
            name="date"
            label="Date de l'évènement"
            format="dddd Do MMMM yyyy"
            initialdate={
              initialdatas && action === 'update'
                ? new Date(initialdatas.date)
                : new Date()
            }
          />
        </Grid>
        <Grid item container>
          <Controller
            name="text"
            control={control}
            defaultValue={initialdatas ? initialdatas.text : ''}
            render={({ onChange, value }) => (
              <PageEditor onChange={onChange} value={value} />
            )}
          />
        </Grid>
      </Grid>
      <Grid item container alignItems="center" justify="flex-end">
        <ButtonComponent
          type="submit"
          disabled={isSubmitting}
          icon={<BackspaceIcon />}
          background={theme.palette.success.main}
          width="300px"
          text="Je poste mon évènement"
        />
      </Grid>
    </StyledForm>
  )
}

EventsForm.defaultProps = null
EventsForm.propTypes = {
  def: PropTypes.string,
  poster: PropTypes.func,
  queryKey: PropTypes.arrayOf(PropTypes.string),
  initialdatas: PropTypes.shape({
    date: PropTypes.number,
    text: PropTypes.string,
    place: PropTypes.string,
  }),
}

export default EventsForm
