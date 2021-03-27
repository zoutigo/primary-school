import {
  Box,
  ButtonGroup,
  Collapse,
  Grid,
  IconButton,
  styled,
  useTheme,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import UpdateIcon from '@material-ui/icons/Update'
import ButtonComponent from '../../../components/others.js/ButtonComponent'
import { isError, useMutation } from 'react-query'
import { useUpdateMutationOptions } from '../../hooks'
import ModalValidation from '../../../components/others.js/ModalValidation'
import { useSelector } from 'react-redux'

const StyledPaperFooter = styled(Grid)(({ theme, bgcolor }) => ({
  display: 'none',
  background: 'gray',
  textAlign: 'right',
}))

const StyledIconButton = styled(IconButton)(({ color, theme }) => ({
  color: color,
  fontSize: '3rem',
}))

function PaperFooter({ paper, item }) {
  const theme = useTheme()
  const { queryKey, poster } = paper
  const { _id: paperId } = item
  const token = useSelector((state) => state.user.Token.token)

  const [open, setOpen] = React.useState(false)
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
    alert('update')
  }
  const handleDelete = () => {
    setOpen(true)
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
        open={open}
        setOpen={setOpen}
        modalheadtext="Confirmation de suppression"
        callback={mutatePaper}
      />
      <ButtonGroup className="buttongroup">
        <StyledIconButton
          color={theme.palette.warning.main}
          onClick={handleUpdate}
        >
          <UpdateIcon style={{ fontSize: 'inherit', color: 'inherit' }} />
        </StyledIconButton>
        <StyledIconButton
          color={theme.palette.error.main}
          onClick={handleDelete}
        >
          <HighlightOffIcon style={{ fontSize: 'inherit', color: 'inherit' }} />
        </StyledIconButton>
      </ButtonGroup>
    </StyledPaperFooter>
  )
}

export default PaperFooter
