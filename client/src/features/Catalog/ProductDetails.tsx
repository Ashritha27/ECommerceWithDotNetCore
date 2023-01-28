import { LoadingButton } from "@mui/lab";
import { Card, CardMedia, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";

export default function ProductDetails(){
    const {basket,setBasket,removeItem } = useStoreContext();
    const {id} = useParams<{id:string}>();
    const [product,setProduct] = useState<Product>();
    const [loading,setLoading] = useState(true);
    const [quantity,setQuantity] = useState(0);
    const [submitting,setSubmitting] = useState(true);
    const item = basket?.items.find(i => i.productId === product?.id);


    useEffect(()=>{
        if(item) setQuantity(item.quantity)
        axios.get( `http://localhost:5000/api/Products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.log(error))
        .finally(()=>setLoading(false))
    },[id,item])

    function handleInputChange(e :any){
        if(e.target.value > 0)
        setQuantity(e.target.value)

    }

    function handleUpdateButton(e : any){
        setSubmitting(true);
        var itemQuantity = item ? item!.quantity : 0;
        if(!item && quantity > itemQuantity ){
            const updatedQuantity = item ? (quantity - itemQuantity ) : quantity ;
            agent.Basket.addItem(product?.id! ,updatedQuantity)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() =>setSubmitting(false))

        }
        else{
            const updatedQuantity =  item!.quantity - quantity;
            agent.Basket.removeItem(product?.id! , updatedQuantity)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(()=>setSubmitting(false))
        }

    }
    if(loading) return <h3>Loading....</h3>
    if(!product) return <h3>Product not found</h3>

    return(
        <Grid container>
            <Grid item xs={6}>
                <Card>
                    <CardMedia src={product.pictureURL} component="img" />
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <Typography variant="h4">{product.name}</Typography>
                    <Divider />
                    <Typography variant="h5" color="secondary">${product.price.toFixed(2)}</Typography>
                    <Divider />
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{product.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Quantity in hand</TableCell>
                                    <TableCell>{product.quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField variant="outlined" type="number" label="Quantity in stock" fullWidth value={quantity} onChange={handleInputChange}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton
                              disabled={item?.quantity === quantity || !item && quantity === 0}
                              onClick={handleUpdateButton}
                              sx={{height:'55px'}}
                              color='primary'
                              size='large'
                              variant="contained"
                              fullWidth
                            >
                                {item? 'Update Quantity' : 'Add to cart'}
                            </LoadingButton>

                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            
        </Grid>
    )
}