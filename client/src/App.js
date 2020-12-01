import React , {useState}from 'react';

import { Grid } from '@material-ui/core'
import Header from './components/header/Header';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import useLocalStorage from './utils/useLocalStorage'
import rubrics from './utils/rubrics'



function App() {

  React.useEffect(() => {
    localStorage.setItem('rubrics', JSON.stringify(rubrics));
  }, []);

  return (
    <Grid container direction='column'>
      <Grid item container> <Header /> </Grid>
      <Grid item container> <Content /></Grid>
      <Grid item container > <Footer /> </Grid>
    </Grid>
  );
}

export default App;
