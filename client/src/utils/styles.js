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
    margin: '0.5em auto',
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
      color: 'red',
    },
    '& div': {
      display: 'flex',
      alignItems: 'center',
      '& label': {
        marginRight: '5em',
      },
      '& div': {
        background: 'whitesmoke',
        textAlign: 'center',
        '& div': {
          '& label': {
            marginLeft: '0.5em',
          },
          '& input': {
            marginTop: '0.1em',
          },
        },
      },
    },
  },
})

export default formStyles
