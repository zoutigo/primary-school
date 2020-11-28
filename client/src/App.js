import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core'
import Header from './components/header/Header';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Grid container direction='column'>
      <Grid item container> <Header /> </Grid>
      <Grid item container> <Content /> </Grid>
      <Grid item container > <Footer /> </Grid>
    </Grid>
  );
}

export default App;
