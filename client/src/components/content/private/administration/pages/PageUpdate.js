import React from 'react'
import Select from 'react-select'
import {
  AppBar,
  Box,
  Button,
  Grid,
  styled,
  Typography,
  useTheme,
} from '@material-ui/core'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import {
  StyledPrivateButton,
  StyledPrivateForm,
  StyledTitle,
} from '../../../../../utils/forms/styledComponents'
import { useToggle } from '../../../../../utils/hooks'
import { apiFecthAllPages, apiUpdatePage } from '../../../../../utils/api'
import { useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient, QueryCache } from 'react-query'
import { pageUpdateSchema } from '../../../../../utils/forms/validators'
import PageEditor from '../../../../../utils/tinyEditors/PageEditor'

function PageUpdate() {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const { toggleState, toggle } = useToggle()
  const currentUpdatePage = useSelector(
    (state) => state.admin.currentUpdatePage
  )

  const notify = () =>
    toast.success(' La page a été correctement modifiée', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const { data: pagesList } = useQuery(['page-list'], apiFecthAllPages, {
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      setShow(true)
    },
    onError: () => {
      setShow(false)
    },
  })

  const token = useSelector((state) => state.user.Token.token)

  const list = pagesList.map((item) => {
    return [item.title, item.alias]
  })

  const [currentPage, setCurrentPage] = React.useState('nopage')
  const [currentAlias, setCurrentAlias] = React.useState('')
  const [editorContent, setEditorContent] = React.useState('')
  const [show, setShow] = React.useState(false)

  const { mutate, info, isError } = useMutation(apiUpdatePage, {
    onSuccess: (data) => {
      notify()
      queryClient.invalidateQueries(currentPage.alias)
      queryClient.invalidateQueries('page-list')
      setShow(false)
    },
  })
  const {
    control,
    handleSubmit,
    setValue,
    errors,
    formState: { isValid, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    mode: 'onChange',
    // resolver: yupResolver(pageUpdateSchema),
  })

  const onSubmit = async (data) => {
    const options = {
      headers: { 'x-access-token': token },
    }
    try {
      await mutate({
        id: currentPage._id,
        options: options,
        body: {
          text: data.editor,
        },
      })
    } catch (err) {}
  }

  React.useEffect(() => {
    const selectedPage = pagesList.find((page) => page.alias === currentAlias)
    if (selectedPage) {
      setCurrentPage(selectedPage)
      setValue('editor', selectedPage.text)
    } else {
      setValue('editor', '')
    }

    return () => {
      setValue('editor', '')
    }
  }, [currentAlias])

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      setShow(false)
    }
  }, [isSubmitSuccessful])

  const handleSelectChange = (e) => {
    const selectedAlias = e.value
    const selectedPage = pagesList.find((page) => page.alias === selectedAlias)
    if (selectedPage) {
      setShow(true)
    }
    setCurrentAlias(selectedAlias)
  }

  return (
    <Grid container>
      <Grid item container>
        <StyledTitle>
          <Typography variant="h5">Modification d'une page</Typography>
        </StyledTitle>
        <ToastContainer />
      </Grid>
      <Grid item container>
        <StyledPrivateForm
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: '100%' }}
        >
          <section>
            <label>React Select</label>
            <Controller
              isClearable
              name="alias"
              control={control}
              render={({ value }) => (
                <Select
                  isDisabled={isError || isSubmitting}
                  value={value}
                  onChange={(e) => handleSelectChange(e)}
                  options={pagesList.map((page) => {
                    return {
                      value: page.alias,
                      label: page.title,
                    }
                  })}
                />
              )}
            />
          </section>
          <section>
            {show && (
              <Controller
                name="editor"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => (
                  <PageEditor onChange={onChange} value={value} />
                )}
              />
            )}
          </section>
          <section>
            {show && (
              <StyledPrivateButton
                bgcolor={theme.palette.success.main}
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Je publie la page
              </StyledPrivateButton>
            )}
          </section>
        </StyledPrivateForm>
      </Grid>
    </Grid>
  )
}

export default PageUpdate
