import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Basket } from "../../app/models/basket";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
     const {removeItem} = useStoreContext()
    const [loading,setLoading] = useState(true);
    const [basket,setBasket] = useState<Basket|null>(null);
    const [status,setStatus] = useState({
      loading:false,
      name:''
    })
      //var store = useStoreContext()
    function handleAddItem(productId:number , name : string){
      setStatus({loading: true , name})
      agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false , name:''}))
    }

    function handleRemoveItem(productId:number , quantity = 1 , name:string){
      setStatus({loading: true , name})
      agent.Basket.removeItem(productId,quantity)
      .then(() => removeItem(productId,quantity)) //todo
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false , name:''}))
    }

    useEffect(()=>{
      agent.Basket.get()
      .then(basket =>setBasket(basket))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
    },[])


   
    if(!basket)
    return <Typography variant='h3'> Your basket is empty</Typography>


    return (
      <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                  {/* <img src={item.product.pictureURL} alt={item.product.name} style={{height :50 }}/> */}
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
              <TableCell align="right">
                <LoadingButton loading={status.loading && status.name ==='rem' + item.productId} 
                onClick={()=> handleRemoveItem(item.productId , 1, 'rem'+ item.productId)} color='error'>
                  <Remove />
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={status.loading && status.name ==='add' + item.productId}  
                onClick={()=> handleAddItem(item.productId ,'add')} color='primary'>
                  <Add />
                </LoadingButton>
                </TableCell>
              <TableCell align="right">${((item.price * item.quantity)/100).toFixed(2)}</TableCell>
              <TableCell align="right">
                <LoadingButton 
                loading={status.loading && status.name ==='rem' + item.productId} 
                onClick={()=> handleRemoveItem(item.productId , item.quantity, 'rem'+ item.productId)} color='error'>
                    <Delete />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
      <Grid item xs={6}></Grid>
        <Grid item xs={6} >
          <BasketSummary />
        </Grid>
    </Grid>
      </>
    
    )

}