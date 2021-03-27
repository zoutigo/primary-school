import {
  Box,
  Modal,
  Paper,
  styled,
  Typography,
  useTheme,
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CancelIcon from '@material-ui/icons/Cancel'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import React from 'react'
import ButtonComponent from './ButtonComponent'
import FontAwesomeIcon from './FontAwesomeIcon'

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxSizing: 'border-box',
  overflow: 'hidden',
  padding: theme.spacing(2, 4, 3),
  width: '600px',
  height: '300px',
  position: 'absolute',
  fontSize: '2rem',
  top: '50vh',
  left: '50vw',
  transform: 'translate(-50%, -50%)',
  '& >:first-child': {
    background: theme.palette.error.main,
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
}))

const StyledModalHeader = styled(Box)(({ theme, color }) => ({
  width: '100%',

  display: 'flex',
  justifyContent: 'flex-start',
  '&:first-child': {},
}))
const StyledModalBody = styled(Box)(({ theme, color }) => ({
  width: '100%',
  paddingTop: '2rem !important',
  paddingBottom: '2rem !important',
  textAlign: 'left',
  paddingLeft: '2em !important',
}))
const StyledModalFooter = styled(Box)(({ theme, color }) => ({
  width: '100%',
}))

function ModalValidation({ open, setOpen, modalheadtext, callback }) {
  const theme = useTheme()

  const handleConfirm = () => {
    setOpen(false)
    console.log('hello')
    callback()
  }
  return (
    <Modal
      aria-labelledby="confirmation modal"
      aria-describedby="confirmation modal"
      open={open}
      onClose={() => setOpen(false)}
      disablePortal={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <StyledPaper>
          <StyledModalHeader>
            <FontAwesomeIcon faclass="fa fa-exclamation-circle" />
            <Typography variant="body1">{modalheadtext} </Typography>
          </StyledModalHeader>
          <StyledModalBody>
            <Typography variant="body1">
              Souhaitez vous supprimer cet élément ?
            </Typography>
          </StyledModalBody>
          <StyledModalFooter>
            <ButtonComponent
              text="Oups Désolé"
              background={theme.palette.warning.main}
              icon={<CancelIcon />}
              onClick={() => setOpen(false)}
            />
            <ButtonComponent
              text="Je supprimme"
              background={theme.palette.error.main}
              icon={<DeleteForeverIcon />}
              onClick={handleConfirm}
            />
          </StyledModalFooter>
        </StyledPaper>
      </Fade>
    </Modal>
  )
}

export default ModalValidation
