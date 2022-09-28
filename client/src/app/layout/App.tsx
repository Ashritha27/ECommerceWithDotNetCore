import { createTheme, CssBaseline, Switch, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPage from '../../features/about/AboutPage';
import BasketPage from '../../features/basket/BasketPage';
import Catalog from '../../features/Catalog/Catalog';
import ProductDetails from '../../features/Catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import { useStoreContext } from '../context/StoreContext';
import { Product } from '../models/product';
import getCookie from '../util/util';
import Header from './Header';

function App() {

  const {setBasket} = useStoreContext();
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const buyerId = getCookie('buyerId');

    if(buyerId){
    axios.get('http://localhost:5000/api/basket',{withCredentials:true})
    .then(res => setBasket(res.data))
    .catch(err => console.log(err)).finally(()=>setLoading(false))
    }
    else{
      setLoading(false);
    }
  },[setBasket]);


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

  if(loading)
  return <h1>Inititalising app...</h1>
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
        <Route path="/basket" element={<BasketPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
