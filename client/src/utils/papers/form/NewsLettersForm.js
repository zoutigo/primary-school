import { Grid, styled, useTheme } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import BackspaceIcon from '@material-ui/icons/Backspace'

import DatePickerControl from '../../forms/DatePickerControl'
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
import requestbody from './requestbody'
import ButtonComponent from '../../../components/others.js/ButtonComponent'

const StyledForm = styled('form')(() => ({
  width: '100%',
}))

function NewsLettersForm({ initialdatas, def, poster, queryKey, type }) {
  const theme = useTheme()
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

  const {
    control,
    handleSubmit,
    register,
    formState: { isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({})

  const onSubmit = async (datas) => {
    const options = {
      headers: { 'x-access-token': token },
    }
    const finalDatas = await requestbody(def, datas, type)

    try {
      const { _id: currentPaperId } = currentDatas

      await mutate({
        id: currentDatas && action !== 'create' ? currentPaperId : '',
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

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item>
          <DatePickerControl
            control={control}
            name="startdate"
            label="Date de debut"
            format="dddd DD MMMM yyyy"
            initialdate={
              initialdatas ? new Date(initialdatas.date) : new Date()
            }
          />
        </Grid>
        <Grid item>
          <label htmlFor="file">Choisir un fichier</label>
          <input type="file" id="file-upload" name="file" ref={register} />
        </Grid>
      </Grid>

      <Grid item container alignItems="center" justify="flex-end">
        <ButtonComponent
          type="submit"
          disabled={isSubmitting}
          icon={<BackspaceIcon />}
          background={theme.palette.success.main}
          width="300px"
          text="Je poste ma newsletter"
        />
      </Grid>
    </StyledForm>
  )
}

NewsLettersForm.defaultProps = null
NewsLettersForm.propTypes = {
  initialdatas: PropTypes.shape({
    file: PropTypes.string,
    month: PropTypes.number,
  }),
  def: PropTypes.string,
  poster: PropTypes.func,
  queryKey: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
}

export default NewsLettersForm
