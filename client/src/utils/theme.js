import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
  palette: {
    primary: {
      // ligth: 'rgb(250,250,210)',
      light: 'rgba(255, 239, 211, 1)', //papaya
      // main: 'rgb(255,215,0)',
      main: 'rgba(255, 196, 155, 1)',
      dark: 'rgb(240,230,140)',
    },
    secondary: {
      light: 'rgba(173, 182, 196, 1)', // cadet-blue-crayola
      main: 'rgba(41, 76, 96, 1)', // charcoal
      dark: 'rgba(0, 27, 46, 1)', // oxford-blue
    },
    third: {
      ligth: 'rgb(250,250,210)',
      main: 'rgb(255,215,0)',
      dark: 'rgb(240,230,140)',
    },
  },
  typography: {
    body1: {
      fontFamily: "'Raleway','Roboto','sans-serif",
      fontSize: '2rem',
      letterSpacing: 2,
    },
    h2: {
      fontSize: '4rem',
      fontFamily: "'Poppins','sans-serif'",
    },
    h6: {
      fontSize: '1em',
      fontFamily: "'Poppins', 'Raleway'",
      letterSpacing: '1px',
      lineHeight: 3,
    },
    h1: {
      fontFamily: "'Poppins','Raleway', sans-serif",
      fontSize: '5em',
      fontWeight: 'bold',
      letterSpacing: '1px',
      lineHeight: 1.2,
    },
    subtitle1: {
      fontFamily: 'sans-serif',
      letterSpacing: 1,
    },
  },
  overrides: {
    MuiInputBase: {
      input: {
        fontSize: '1em',
        minHeight: '1em',
      },
    },
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        color: 'blue',
        '&$focused': {
          // increase the specificity for the pseudo class
          color: 'blue',
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
