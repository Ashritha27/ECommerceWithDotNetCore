import { createTheme, CssBaseline, Switch, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/Catalog/Catalog';
import ProductDetails from '../../features/Catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import { Product } from '../models/product';
import Header from './Header';

function App() {
  const [darkMode,setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark':'light';
  const theme = createTheme({
    palette:{
      mode:paletteType
    }
  });
  const changeHandler = () =>{
    setDarkMode(!darkMode);
  }

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} changeHandler={changeHandler} />
      <Container>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
