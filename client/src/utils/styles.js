const formStyles = (theme) => ({
  root: {
    // position: 'relative',
    // minWidth: '100%',
    // background: 'yellow',
    // padding: '2em',
  },
  circularContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  form: {
    minWidth: '100%',
  },

  formGroup: {
    paddingTop: '4em',
    border: 'solid 1px gray',
    width: '80%',
    marginTop: '3em',
    display: 'flex',
    flexDirection: 'column',
    '& label': {
      marginBottom: '0.2em',
    },
    '& input': {
      minHeight: '4em',
      witdh: '100%',
      background: 'whitesmoke',
      border: 'none',
    },
    '& p': {
      minHeight: '1em',
      color: 'red',
    },
  },
})

export default formStyles
