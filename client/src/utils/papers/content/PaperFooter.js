import {
  Box,
  ButtonGroup,
  Collapse,
  Grid,
  IconButton,
  styled,
  Tooltip,
  useTheme,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import UpdateIcon from '@material-ui/icons/Update'
import { isError, useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../../components/others.js/ButtonComponent'
import { useUpdateMutationOptions } from '../../hooks'
import ModalValidation from '../../../components/others.js/ModalValidation'
import {
  setCurrentPaperItem,
  setFormAction,
  setShowPapersForm,
  setShowPapersInnerForm,
  setShowPapersItems,
  setShowPapersList,
} from '../../../redux'

const StyledPaperFooter = styled(Grid)(({ theme, bgcolor }) => ({
  boxSizing: 'border-box',
  padding: '0px 1rem !important',
}))

const StyledIconButton = styled(IconButton)(({ color, theme }) => ({
  color: color,
  fontSize: '3rem',
  marginLeft: '2rem !important',
}))

function PaperFooter({ paper, item, index }) {
  const theme = useTheme()
  const dispatch = useDispatch()

  const { queryKey, poster } = paper
  const { _id: paperId } = item
  const token = useSelector((state) => state.user.Token.token)

  const [open, setOpen] = React.useState(false)
  const [openupdatemodal, setOpenupdatemodal] = React.useState(false)
  const [openAlert, setOpenAlert] = React.useState(false)

  const {
    mutate,
    error: mutationerror,
    isError: isMutationError,
    isSuccess: isMutationSuccess,
  } = useMutation(poster, useUpdateMutationOptions(queryKey))

  const mutatePaper = async () => {
    const options = {
      headers: { 'x-access-token': token },
    }
    try {
      await mutate({
        id: paperId,
        action: 'delete',
        options: options,
      })
    } catch (err) {
      console.log('error:', err)
    }
  }

  React.useEffect(() => {
    if (mutationerror && isError) {
      console.log('erreur')
      setOpenAlert(true)
    }
    return () => {
      setOpenAlert(false)
    }
  }, [isError])

  const handleUpdate = () => {
    dispatch(setShowPapersForm(true))
    dispatch(setShowPapersList(false))
    dispatch(setShowPapersItems(false))
    dispatch(setFormAction('update'))
    dispatch(setCurrentPaperItem({ index: index, datas: item }))
  }

  return (
    <StyledPaperFooter
      item
      container
      justify="flex-end"
      xs={12}
      xl={12}
      id="paper-footer"
    >
      <Collapse in={isMutationError}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Close me!
        </Alert>
      </Collapse>
      <ModalValidation
        modaltype="delete"
        open={open}
        setOpen={setOpen}
        callback={mutatePaper}
      />
      <ModalValidation
        modaltype="update"
        open={openupdatemodal}
        setOpen={setOpenupdatemodal}
        callback={handleUpdate}
      />
      <ButtonGroup>
        <Tooltip title="Modifier" placement="bottom">
          <StyledIconButton
            color={theme.palette.warning.main}
            onClick={() => setOpenupdatemodal(true)}
          >
            <UpdateIcon style={{ fontSize: 'inherit', color: 'inherit' }} />
          </StyledIconButton>
        </Tooltip>
        <Tooltip title="Supprimer" placement="bottom">
          <StyledIconButton
            color={theme.palette.error.main}
            onClick={() => setOpen(true)}
          >
            <HighlightOffIcon
              style={{ fontSize: 'inherit', color: 'inherit' }}
            />
          </StyledIconButton>
        </Tooltip>
      </ButtonGroup>
    </StyledPaperFooter>
  )
}

export default PaperFooter
