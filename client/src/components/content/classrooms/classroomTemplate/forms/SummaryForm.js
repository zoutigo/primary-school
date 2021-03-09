import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { styled, useTheme } from '@material-ui/styles'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import SmallEditor from '../../../../../utils/tinyEditors/SmallEditor'
import { classroomSummarySchema } from '../../../../../utils/forms/validators'
import { useSelector } from 'react-redux'
import { apiFecthClassroom, apiUpdateClassroom } from '../../../../../utils/api'
import { StyledPrivateButton } from '../../../../../utils/forms/styledComponents'
import { ErrorMessage } from '@hookform/error-message'

import { notifySuccess } from '../../../../../utils/notifications'
import { useUpdateMutationOptions } from '../../../../../utils/hooks'
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

function SummaryForm({
  id: classroomId,
  alias,
  setButtonGroup,
  setSummaryForm,
  setSummaryContent,
}) {
  const theme = useTheme()

  const token = useSelector((state) => state.user.Token.token)

  const queryName = `classroom-${alias}`
  const queryKey = [queryName, classroomId]
  const {
    mutate,
    error: mutationerror,
    isError: isMutationError,
    isSuccess: isMutationSuccess,
  } = useMutation(apiUpdateClassroom, useUpdateMutationOptions(queryKey))

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

  const onSubmit = async (datas) => {
    const { summary } = datas
    const options = {
      headers: { 'x-access-token': token },
    }
    try {
      await mutate({
        id: classroomId,
        options: options,
        body: {
          summary: summary,
        },
      })
    } catch (err) {
      console.log('error:', err)
    }
  }

  // close the form
  React.useEffect(() => {
    if (isMutationSuccess) {
      notifySuccess('Le résumé a bien été mis à jour')
      setSummaryForm(false)
      setButtonGroup(true)
      setSummaryContent(true)
    }
  }, [isMutationSuccess])

  const { isLoading, isError, data, error, isSuccess } = useQuery(
    queryKey,
    () => apiFecthClassroom(classroomId)
  )
  // injection of the initial value in the editor
  React.useEffect(() => {
    setValue('summary', data.summary)
    return () => {
      setValue('summary', '')
    }
  }, [isSuccess])

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <section>
        <StyledButton
          type="button"
          bgcolor={theme.palette.warning.main}
          disabled={isSubmitting}
          onClick={() => {
            setSummaryForm(false)
            setButtonGroup(true)
            setSummaryContent(true)
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
          Je publie le resumé
        </StyledButton>
      </section>
    </StyledForm>
  )
}

export default SummaryForm
