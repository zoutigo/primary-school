import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, styled, useTheme } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import BackspaceIcon from '@material-ui/icons/Backspace'

import { Controller, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import InputTextControl from '../../forms/InputTextControl'
import {
  useDispatchOnMount,
  useDispatchOnMutation,
  useDispatchOnUnmount,
  useUpdateMutationOptions,
} from '../../hooks'
import { articlesSchema } from '../../forms/validators'
import requestbody from './requestbody'
import {
  setCurrentPaperItem,
  setFormAction,
  setShowPapersForm,
  setShowPapersInnerForm,
  setShowPapersItems,
  setShowPapersList,
} from '../../../redux'
import PageEditor from '../../tinyEditors/PageEditor'
import ButtonComponent from '../../../components/others.js/ButtonComponent'

const StyledForm = styled('form')(() => ({
  width: '100%',
}))

function ArticlesForm({ initialdatas, def, poster, queryKey, type }) {
  const theme = useTheme()

  const token = useSelector((state) => state.user.Token.token)
  const { formAction: action, currentPaperItem } = useSelector(
    (state) => state.papers
  )

  const currentDatas = !currentPaperItem ? null : currentPaperItem.datas
  const dispatch = useDispatch()

  const { mutate, isSuccess: isMutationSuccess } = useMutation(
    poster,
    useUpdateMutationOptions(queryKey)
  )

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(articlesSchema),
  })

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
      <Grid item container>
        <Grid item container>
          <InputTextControl
            name="title"
            control={control}
            initialvalue={initialdatas ? initialdatas.title : ''}
            helperText="au moins 10 caractères"
            label="Titre"
            width="100%"
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
          disabled={isSubmitting || !isValid}
          icon={<BackspaceIcon />}
          background={theme.palette.success.main}
          width="300px"
          text="Je poste mon article"
        />
      </Grid>
    </StyledForm>
  )
}

ArticlesForm.defaultProps = null
ArticlesForm.propTypes = {
  initialdatas: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  def: PropTypes.string,
  poster: PropTypes.func,
  queryKey: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
}

export default ArticlesForm
