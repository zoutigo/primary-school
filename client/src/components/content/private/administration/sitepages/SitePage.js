import { Button, useTheme } from '@material-ui/core'
import React from 'react'
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

const pagesList = [
  ['apel', 'apel'],
  ['ogec', 'ogec'],
  ['histoire', 'histoire'],
]
const list = pagesList.map((item) => item[1])

const schema = yup.object().shape({
  // page: yup.string().required('Il faut au moins une phrase'),
  select: yup.mixed().oneOf(list),
})

function SitePage() {
  const theme = useTheme()
  const { toggle, toggleState } = useToggle()
  const [datas, setDatas] = React.useState('')

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

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <StyledPrivateForm onSubmit={handleSubmit(onSubmit)}>
      <StyledPrivateButton
        bgcolor={theme.palette.primary.main}
        type="button"
        onClick={toggle}
        // disabled={!toggleState}
      >
        Creer une page
      </StyledPrivateButton>

      {/* <StyledPrivateButton
        bgcolor={theme.palette.success.main}
        type="submit"
        onClick={toggle}
        disabled={!isValid ? true : isSubmitting ? true : false}
        // disabled={!toggleState}
      >
        Je sauvegarde sans publier
      </StyledPrivateButton> */}

      {toggleState && (
        <SelectInput
          ref={register}
          required
          label="Page"
          helperText="Choisir une page"
          name="select"
          initialValue="Selectionner"
          options={pagesList}
          errors={errors}
        />
      )}
      {toggleState && <TinyEditor datas={datas} setDatas={setDatas} />}

      {/* <TextInput value={datas} name="page" ref={register} errors={errors} /> */}

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
