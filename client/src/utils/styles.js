import { styled } from '@material-ui/styles'

const formStyles = (theme) => ({
  textField: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: '0',
    marginTop: 0,
    fontWeight: 500,
    position: 'relative',
  },
  formGroup: {
    width: '100%',
    margin: '1em auto',
    display: 'flex',
    flexDirection: 'column',
    '& label': {
      marginBottom: '0.2em',
    },
    '& input': {
      minHeight: '2em',
      background: 'whitesmoke',
      border: 'none',
    },
    '& p': {
      minHeight: '1em',
    },
  },
})

export default formStyles
