import { createMuiTheme , responsiveFontSizes} from '@material-ui/core/styles';

import green from '@material-ui/core/colors/green';

let theme = createMuiTheme({
  palette: {
    primary: {
      ligth: 'rgb(250,250,210)',
      main: 'rgb(255,215,0)',
      dark: 'rgb(240,230,140)'
    },
    secondary: {
      main: green[500],
    },
    third : {
      ligth: 'rgb(250,250,210)',
      main: 'rgb(255,215,0)',
      dark: 'rgb(240,230,140)'
    }
  },
  typography:{
    h6 : {
      fontSize: '1em' ,
      fontFamily: "'Poppins', 'Raleway'",
      letterSpacing: '1px',
      lineHeight: 3
    },
    h1 : {
      fontFamily: "Raleway', 'Poppins', sans-serif",
      fontSize: '8em',
      letterSpacing: '1px',
      lineHeight: 4
    }
  }
});

theme = responsiveFontSizes(theme)

export default theme