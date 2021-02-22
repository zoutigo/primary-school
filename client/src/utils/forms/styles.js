const styles = (theme) => ({
  textfield: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    background: 'transparent',
    marginTop: '2em !important',
    marginBottom: '3em !important',
    '& .MuiFormControl-root ': {
      background: 'transparent',
      width: '70%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      '& .MuiInput-root': {
        height: '3.5em',
        width: '85%',
        paddingTop: '0.6em',
        fontSize: '1em',
        [theme.breakpoints.down('md')]: {
          width: '90%',
        },
      },
      '& .MuiInputLabel-root': {
        color: theme.palette.secondary.dark,
        fontSize: '2em',
      },
      '& label.Mui-focused ': {
        color: theme.palette.info.dark,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.info.dark,
      },
      '& .MuiFormHelperText-root': {
        // color: theme.palette.info.dark,
        fontSize: '1.2em',
        fontStyle: 'italic',
      },
    },
    '& >span': {
      color: theme.palette.error.main,
    },
  },
})

export default styles
