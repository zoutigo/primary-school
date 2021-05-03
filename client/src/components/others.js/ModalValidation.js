import {
  Box,
  Modal,
  Paper,
  styled,
  Typography,
  useTheme,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CancelIcon from '@material-ui/icons/Cancel'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import React from 'react'
import ButtonComponent from './ButtonComponent'
import FontAwesomeIcon from './FontAwesomeIcon'

const StyledPaper = styled(Paper)(({ theme, color }) => ({
  boxSizing: 'border-box',
  overflow: 'hidden',
  padding: theme.spacing(2, 4, 3),
  width: '600px',

  position: 'absolute',
  fontSize: '2rem',
  top: '50vh',
  left: '50vw',
  transform: 'translate(-50%, -50%)',
  '& >:first-child': {
    background: color,
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
  boxSizing: 'border-box',
  width: '100%',
  paddingTop: '2rem !important',
  paddingBottom: '2rem !important',
  textAlign: 'left',
  paddingLeft: '2em !important',
}))
const StyledModalFooter = styled(Box)(({ theme, color }) => ({
  width: '100%',
}))

function ModalValidation({ open, setOpen, callback, modaltype }) {
  const theme = useTheme()

  const costum = (type) => {
    switch (type) {
      case 'delete':
        return {
          title: 'Suppression document',
          color: theme.palette.error.main,
          actiontext: 'Je supprime',
          question: 'souhaitez  vous supprimer cet élément ?',
        }

      case 'update':
        return {
          title: 'Modification document',
          color: theme.palette.info.main,
          actiontext: 'Je mofifie',
          question: 'souhaitez vous supprimer cet élément ?',
        }

      default:
        return {
          title: 'Demande de confirmation',
          color: theme.palette.primary.main,
          actiontext: 'Je confirme',
          question: 'souhaitez vous continuer ?',
        }
    }
  }

  const { color: modalcolor, actiontext, question, title } = costum(modaltype)
  const handleConfirm = () => {
    setOpen(false)
    callback()
  }
  return (
    <Modal
      aria-labelledby="confirmation modal"
      aria-describedby="confirmation modal"
      open={open}
      onClose={() => setOpen(false)}
      disablePortal
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <StyledPaper color={modalcolor}>
          <StyledModalHeader>
            <FontAwesomeIcon faclass="fa fa-exclamation-circle" />
            <Typography variant="body1">{title}</Typography>
          </StyledModalHeader>
          <StyledModalBody>
            <Typography variant="body1">{question}</Typography>
          </StyledModalBody>
          <StyledModalFooter>
            <ButtonComponent
              text="Oups Désolé"
              background={theme.palette.warning.main}
              icon={<CancelIcon />}
              onClick={() => setOpen(false)}
            />
            <ButtonComponent
              text={actiontext}
              background={modalcolor}
              icon={<DeleteForeverIcon />}
              onClick={handleConfirm}
            />
          </StyledModalFooter>
        </StyledPaper>
      </Fade>
    </Modal>
  )
}

ModalValidation.defaultProps = null
ModalValidation.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  callback: PropTypes.func,
  modaltype: PropTypes.string,
}

export default ModalValidation
