import React from 'react'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { ErrorMessage } from '@hookform/error-message'
import { TextField } from '@material-ui/core'
import { ToastContainer } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useUpdateMutationOptions } from '../../../../../../utils/hooks'
import { apiPostPaper } from '../../../../../../utils/api'
import { paperSchema } from '../../../../../../utils/forms/validators'
import { notifySuccess } from '../../../../../../utils/notifications'
import { StyledForm } from '../../../../../../utils/forms/styledComponents'
import { StyledButton } from '../../../../../../utils/componentsStyled'
import { styled, useTheme } from '@material-ui/styles'
import SmallEditor from '../../../../../../utils/tinyEditors/SmallEditor'

const ArticleStyledForm = styled(StyledForm)(({ theme, bgcolor }) => ({
  '& section': {
    marginTop: '1em !important',
    width: '100%',
  },
}))

function ArticleForm({ setArticleForm, setArticleContent, setButtonGroup }) {
  const token = useSelector((state) => state.user.Token.token)
  const paperType = 'article'
  const queryKey = ['papers', paperType]

  const theme = useTheme()

  const {
    mutate,
    error: mutationerror,
    isError: isMutationError,
    isSuccess: isMutationSuccess,
  } = useMutation(apiPostPaper, useUpdateMutationOptions(queryKey))

  const {
    register,
    control,
    errors,
    setValue,
    handleSubmit,
    formState: { isValid, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(paperSchema),
  })

  const onSubmit = async (datas) => {
    const { text, title } = datas
    const options = {
      headers: { 'x-access-token': token },
    }
    try {
      await mutate({
        id: '',
        options: options,
        body: {
          text: text,
          title: title,
          type: paperType,
          status: 'released',
        },
      })
    } catch (err) {
      console.log('error:', err)
    }
  }

  // close the form
  React.useEffect(() => {
    if (isMutationSuccess) {
      notifySuccess('Votre article a été publié')
      setArticleForm(false)
      setArticleContent(true)
      setButtonGroup(true)
    }
  }, [isMutationSuccess])

  return (
    <ArticleStyledForm onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <section>
        <StyledButton
          type="button"
          bgcolor={theme.palette.warning.main}
          disabled={isSubmitting}
          onClick={() => {
            setArticleForm(false)
            setArticleContent(true)
            setButtonGroup(true)
          }}
        >
          Retour
        </StyledButton>
      </section>
      <section>
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
              style={{ margin: 8 }}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      </section>
      <section>
        <Controller
          name="text"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <SmallEditor onChange={onChange} value={value} />
          )}
        />
      </section>
      <section>
        <ErrorMessage errors={errors} name="summary" as="div" />
      </section>
      <section style={{ textAlign: 'right' }}>
        <StyledButton
          type="submit"
          bgcolor={theme.palette.success.main}
          disabled={!isValid || isSubmitting}
        >
          Je publie mon article
        </StyledButton>
      </section>
    </ArticleStyledForm>
  )
}

export default ArticleForm
