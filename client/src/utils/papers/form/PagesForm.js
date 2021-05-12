import { Grid, styled, useTheme } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import BackspaceIcon from '@material-ui/icons/Backspace'
import { ToastContainer } from 'react-toastify'

import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import PageEditor from '../../tinyEditors/PageEditor'
import {
  useDispatchOnMount,
  useDispatchOnMutation,
  useDispatchOnUnmount,
  useUpdateMutationOptions,
} from '../../hooks'
import ButtonComponent from '../../../components/others.js/ButtonComponent'
import requestbody from './requestbody'
import {
  setCurrentPaperItem,
  setFormAction,
  setShowPapersForm,
  setShowPapersInnerForm,
  setShowPapersItems,
  setShowPapersList,
} from '../../../redux'
import { notifyApiFailure } from '../../notifications'

const StyledForm = styled('form')(() => ({
  width: '100%',
}))

function PagesForm({ initialdatas, poster, queryKey, def }) {
  const token = useSelector((state) => state.user.Token.token)
  const { formAction: action, currentPaperItem } = useSelector(
    (state) => state.papers
  )
  const theme = useTheme()
  const dispatch = useDispatch()

  const currentDatas = !currentPaperItem ? null : currentPaperItem.datas

  const { mutate, isSuccess: isMutationSuccess } = useMutation(
    poster,
    useUpdateMutationOptions(queryKey)
  )

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({})

  const onSubmit = async (datas) => {
    const options = {
      headers: { 'x-access-token': token },
    }
    const finalDatas = await requestbody(def, datas)

    try {
      await mutate({
        id: currentDatas && action !== 'create' ? currentDatas._id : '',
        action: action,
        options: options,
        body: finalDatas,
      })
    } catch (err) {
      notifyApiFailure(err)
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
      <ToastContainer />
      <Grid item container>
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
        <Grid item container alignItems="center" justify="flex-end">
          <ButtonComponent
            type="submit"
            disabled={isSubmitting}
            icon={<BackspaceIcon />}
            background={theme.palette.success.main}
            width="300px"
            text="Je poste ma page"
          />
        </Grid>
      </Grid>
    </StyledForm>
  )
}

PagesForm.defaultProps = {
  initialdatas: {
    text: null,
  },
}

PagesForm.propTypes = {
  initialdatas: PropTypes.shape({
    text: PropTypes.string,
  }),
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  poster: PropTypes.string.isRequired,
  def: PropTypes.string.isRequired,
}

export default PagesForm
