import React from 'react'
import Select from 'react-select'
import { Grid, Typography, useTheme } from '@material-ui/core'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Controller, useForm } from 'react-hook-form'
import {
  StyledPrivateButton,
  StyledPrivateForm,
  StyledTitle,
} from '../../../../../utils/forms/styledComponents'
import { apiFecthAllPages, apiUpdatePage } from '../../../../../utils/api'
import { useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import PageEditor from '../../../../../utils/tinyEditors/PageEditor'

function PageUpdate() {
  const theme = useTheme()
  const queryClient = useQueryClient()

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

  const [currentPage, setCurrentPage] = React.useState('nopage')
  const [currentAlias, setCurrentAlias] = React.useState('')
  const [show, setShow] = React.useState(false)

  const { mutate } = useMutation(apiUpdatePage, {
    onSuccess: () => {
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
    formState: { isValid, isSubmitting, isSubmitSuccessful, isError },
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
    } catch (err) {
      console.log(err)
    }
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

  const text = `Modification d'une page`

  return (
    <Grid container>
      <Grid item container>
        <StyledTitle>
          <Typography variant="h5">{text}</Typography>
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
