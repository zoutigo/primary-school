import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FormControl } from '@material-ui/core'
import { styled, useTheme } from '@material-ui/styles'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { QueryClient, useMutation } from 'react-query'
import SmallEditor from '../../../../../utils/tinyEditors/SmallEditor'
import { classroomSummarySchema } from '../../../../../utils/forms/validators'
import { useSelector } from 'react-redux'
import { apiUpdateClassroom } from '../../../../../utils/api'
import { StyledPrivateButton } from '../../../../../utils/forms/styledComponents'
import { ErrorMessage } from '@hookform/error-message'
import { notifyFailure } from '../../../../../utils/notifications'
const StyledForm = styled('form')(({ theme, bgcolor }) => ({
  height: '3em',
  padding: '0.5em !important',
  background: bgcolor,
}))
const StyledButton = styled(StyledPrivateButton)(({ theme, bgcolor }) => ({
  height: '3em',
  padding: '0.5em !important',
  margin: '1em 0em ! important',
  background: bgcolor,
  width: '250px',
}))

function SummaryForm({ id, alias, setShow, summary }) {
  const theme = useTheme()
  const queryClient = new QueryClient()
  const token = useSelector((state) => state.user.Token.token)

  const { mutate, info } = useMutation(apiUpdateClassroom, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(alias)
    },
    onError: (error, variables, context) => {
      switch (error.response.status) {
        case 498:
          notifyFailure(
            "vous n'avez été deconnectés. Enregistrez votre texte et reconnectetez vous"
          )
          break

        default:
          notifyFailure("une erreur s'est produite")
      }
    },
  })

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
    resolver: yupResolver(classroomSummarySchema),
  })

  const onSubmit = async (data) => {
    const { summary } = data
    const options = {
      headers: { 'x-access-token': token },
    }
    try {
      await mutate({
        id: id,
        options: options,
        body: {
          summary: summary,
        },
      })
    } catch (err) {}
  }
  // injection of the initial value in the editor
  React.useEffect(() => {
    setValue('summary', summary)
    return () => {
      setValue('summary', '')
    }
  }, [])

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <section>
        <StyledButton
          type="button"
          bgcolor={theme.palette.warning.main}
          disabled={isSubmitting}
          onClick={() => {
            setShow({
              buttonGroup: true,
              imageForm: false,
              summaryForm: false,
            })
          }}
        >
          Retour
        </StyledButton>
      </section>
      <Controller
        name="summary"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => (
          <SmallEditor onChange={onChange} value={value} />
        )}
      />
      <section>
        <ErrorMessage errors={errors} name="summary" as="div" />
      </section>

      <section style={{ textAlign: 'right' }}>
        <StyledButton
          type="submit"
          bgcolor={theme.palette.success.main}
          disabled={!isValid || isSubmitting}
        >
          Je publie la page
        </StyledButton>
      </section>
    </StyledForm>
  )
}

export default SummaryForm
