import { Grid, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm, Controller } from 'react-hook-form'
import {
  StyledPrivateButton,
  StyledPrivateForm,
  StyledTitle,
} from '../../../../../utils/forms/styledComponents'
import TextInput from '../../../../../utils/forms/TextInput'

import { apiCreatePage } from '../../../../../utils/api'
import { useSelector } from 'react-redux'
import PageEditor from '../../../../../utils/tinyEditors/PageEditor'
import { pageCreationSchema } from '../../../../../utils/forms/validators'
import { QueryClient, useMutation } from 'react-query'

function PageCreation() {
  const theme = useTheme()

  const queryClient = new QueryClient()

  const [submittedData, setSubmittedData] = React.useState({})

  const notify = () =>
    toast.success(' La page a été crée correctement', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  const token = useSelector((state) => state.user.Token.token)

  const { mutate, info } = useMutation(apiCreatePage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('page-list')
      notify()
    },
  })

  const {
    register,
    control,
    errors,
    handleSubmit,
    formState: { isValid, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(pageCreationSchema),
  })

  const onSubmit = async (data) => {
    const { title, alias, editorText } = data
    const options = {
      headers: { 'x-access-token': token },
    }
    try {
      await mutate({
        options: options,
        body: {
          title: title,
          alias: alias,
          text: editorText,
        },
      })
      setSubmittedData(data)
    } catch (err) {}
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        title: '',
        alias: '',
        editorText: '',
      })
    }
  }, [isSubmitSuccessful, submittedData, reset])

  return (
    <Grid container>
      <Grid item container>
        <StyledTitle>
          <Typography variant="h5">Creation d'une page</Typography>
        </StyledTitle>
        <ToastContainer />
      </Grid>
      <Grid item container>
        <StyledPrivateForm onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Titre de la page"
            name="title"
            helperText={'caratères: minimum 3 , maximum 20'}
            ref={register}
            error={errors.title ? true : false}
            errors={errors.title}
          />
          <TextInput
            label="alias de la page"
            name="alias"
            helperText={'caratères: minimum 3 , maximum 15'}
            ref={register}
            error={errors.alias ? true : false}
            errors={errors.alias}
          />
          <section>
            <Controller
              name="editorText"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <PageEditor onChange={onChange} value={value} />
              )}
            />
          </section>
          <section style={{ textAlign: 'right', margin: '1em' }}>
            <StyledPrivateButton
              bgcolor={theme.palette.success.main}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Je publie la page
            </StyledPrivateButton>
          </section>
        </StyledPrivateForm>
      </Grid>
    </Grid>
  )
}

export default PageCreation
