import { CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Catalog from '../../features/Catalog/Catalog';
import { Product } from '../models/product';
import Header from './Header';

function App() {

  const [products,setProducts] = useState<Product[]>([])

  useEffect(()=>{
    fetch("http://localhost:5000/api/Products").then(response => response.json()).then(data => setProducts(data))
  },[]);

  const addProducts =(e : any)=>{
    setProducts(prevState => [...prevState , 
      {id:prevState.length+1 ,name:'P2',price:100.00,description:'pres',type:'sd',brand:'jjk',pictureURL:'http://picsum.photos/200',quantityInStock:100 }
    ])
  }

  return (

    <>
      <CssBaseline />
      <Header />
      <Container>
      <Catalog products={products} addProducts={addProducts}/>
      </Container>
      

    </>
  );
}

export default App;
