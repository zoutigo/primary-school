const myDatasStyle = () => ({
  root: {
    background: 'yellow',
    '& div': {
      paddingTop: '1em',
    },
  },
  dataGroup: {
    display: 'flex',
    minHeight: '4vh',
    '& div:first-child': {
      minWidth: '40%',
    },
  },
})

export default myDatasStyle
