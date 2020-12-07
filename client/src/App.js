import React from 'react';

import { Grid } from '@material-ui/core'
import Header from './components/header/Header';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';


function App() {


  return (
    <Grid container direction='column'>
      <Grid item container> <Header /> </Grid>
      <Grid item container> 
        <Content>
          <h1> How to make this happen ?</h1>
        </Content>

        </Grid>
      <Grid item container > <Footer /> </Grid>
    </Grid>
  );
}

export default App;
