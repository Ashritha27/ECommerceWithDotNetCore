import React, { useEffect, useState } from 'react';
import Catalog from '../../features/Catalog/Catalog';
import { Product } from '../models/product';

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

    <div className="app">
      <h1>App name</h1>
      <Catalog products={products} addProducts={addProducts}/>
      

    </div>
  );
}

export default App;
