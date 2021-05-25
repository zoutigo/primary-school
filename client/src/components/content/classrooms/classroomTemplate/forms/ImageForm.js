import { yupResolver } from '@hookform/resolvers/yup'
import { styled, useTheme } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import { ErrorMessage } from '@hookform/error-message'

import Resizer from 'react-image-file-resizer'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { apiUpdateClassroom } from '../../../../../utils/api'
import { StyledPrivateButton } from '../../../../../utils/forms/styledComponents'
import { useUpdateMutationOptions } from '../../../../../utils/hooks'
import { classroomImageSchema } from '../../../../../utils/forms/validators'
import {
  notifyApiFailure,
  notifySuccess,
} from '../../../../../utils/notifications'

const StyledButton = styled(StyledPrivateButton)(({ bgcolor }) => ({
  height: '3em',
  padding: '0.5em !important',
  margin: '1em 0em ! important',
  background: bgcolor,
  width: '250px',
}))

const StyledForm = styled('form')(({ bgcolor }) => ({
  height: '3em',
  padding: '0.5em !important',
  background: bgcolor,
}))

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1200,
      500,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      'base64'
    )
  })

function ImageForm({
  id: classroomId,
  alias,
  setButtonGroup,
  setImageForm,
  setSummaryContent,
}) {
  const theme = useTheme()
  const token = useSelector((state) => state.user.Token.token)
  const queryName = `classroom-${alias}`
  const queryKey = [queryName, classroomId]

  const { mutate, isSuccess: isMutationSuccess } = useMutation(
    apiUpdateClassroom,
    useUpdateMutationOptions(queryKey)
  )

  const {
    register,
    errors,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(classroomImageSchema),
  })

  const onSubmit = async (datas) => {
    const { image } = datas
    const options = {
      headers: { 'x-access-token': token },
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
    }

    const imageResized = await resizeFile(image[0])

    try {
      await mutate({
        id: classroomId,
        options: options,
        body: {
          image: imageResized,
        },
      })
    } catch (err) {
      notifyApiFailure(err)
    }
  }

  // close the form
  React.useEffect(() => {
    if (isMutationSuccess) {
      notifySuccess('Le résumé a bien été mis à jour')
      setImageForm(false)
      setButtonGroup(true)
      setSummaryContent(true)
    }
  }, [isMutationSuccess])

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <section>
        <StyledButton
          type="button"
          bgcolor={theme.palette.warning.main}
          onClick={() => {
            setImageForm(false)
            setButtonGroup(true)
            setSummaryContent(true)
          }}
        >
          Retour
        </StyledButton>
      </section>
      <section>
        <input ref={register} name="image" type="file" />
      </section>
      <section>
        <ErrorMessage
          style={{ color: 'red' }}
          errors={errors}
          name="image"
          as="div"
        />
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
ImageForm.propTypes = {
  id: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  setButtonGroup: PropTypes.bool.isRequired,
  setImageForm: PropTypes.bool.isRequired,
  setSummaryContent: PropTypes.bool.isRequired,
}

export default ImageForm
