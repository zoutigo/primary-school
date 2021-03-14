import { useTheme } from '@material-ui/core'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import {
  StyledPrivateButton,
  StyledPrivateForm,
} from '../../../../../utils/forms/styledComponents'
import TextInput from '../../../../../utils/forms/TextInput'
import { useToggle } from '../../../../../utils/hooks'
import TinyEditor from '../../../../../utils/TinyEditor'
import SelectInput from '../../../../../utils/forms/SelectInput'
import { apiCreatePage } from '../../../../../utils/api'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

const pagesList = [
  ['apel', 'apel'],
  ['ogec', 'ogec'],
  ['histoire', 'histoire'],
]
const list = pagesList.map((item) => item[1])

const schema = yup.object().shape({
  // text: yup.string().required('Il faut au moins une phrase'),
  alias: yup.mixed().oneOf(list),
})

function SitePage() {
  const history = useHistory()

  const theme = useTheme()
  const { toggle, toggleState } = useToggle()
  const [datas, setDatas] = React.useState('')
  const notify = () => toast(`la page a été créée avec succès`)
  const token = useSelector((state) => state.user.Token.token)
  const {
    register,
    errors,
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    const { alias, text } = data

    const Page = []
    pagesList.forEach((page) => {
      if (page[1] === alias) {
        Page.push(page)
      }
    })
    const datas = {
      title: Page[0][1],
      alias: Page[0][0],
      text: text,
    }
    const options = {
      headers: { 'x-access-token': token },
    }

    await apiCreatePage(datas, options).then((response) => {
      if (response.status === 201) {
        setDatas('')
        reset()
        notify()
        history.push({
          pathname: '/private',
          state: {
            from: '/private/createpage',
          },
        })
      }
    })
  }

  return (
    <StyledPrivateForm onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <StyledPrivateButton
        bgcolor={theme.palette.primary.main}
        type="button"
        onClick={toggle}
      >
        Creer une page
      </StyledPrivateButton>

      {toggleState && (
        <SelectInput
          ref={register}
          required
          label="Page"
          helperText="Choisir une page"
          name="alias"
          initial="Selectionner"
          options={pagesList}
          errors={errors}
        />
      )}
      {toggleState && <TinyEditor datas={datas} setDatas={setDatas} />}

      <TextInput value={datas} name="text" ref={register} errors={errors} />

      {toggleState && (
        <StyledPrivateButton
          bgcolor={theme.palette.success.main}
          type="submit"
          disabled={!isValid}
          // disabled={!toggleState}
        >
          Je publie la page
        </StyledPrivateButton>
      )}
    </StyledPrivateForm>
  )
}

export default SitePage
