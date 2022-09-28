import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import {Store} from "../../../Store.js"
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useStoreContext } from "../../app/context/StoreContext";

interface Props{
    product : Product;
}
export default function ProductCard({product} : Props){

  const [loading,setLoading] = useState(false);
  const {setBasket} = useStoreContext();

  function addClickHandler(productId:number){
    setLoading(true);
    axios.post(`http://localhost:5000/api/basket?productId=${productId}&quantity=1`,{withCredentials:true})
    .then(basket => setBasket(basket.data))
    .catch(err => console.log(err))
    .finally(()=>setLoading(false))
  }

    return (
      <Card>
        <CardHeader avatar={
            <Avatar sx={{fontWeight:'bold' ,backgroundColor:'secondary.main'}}>{product.name.charAt(0)}</Avatar>
        }
        title={product.name}
        titleTypographyProps={
            {sx:{
                fontWeight:'bold',color:'primary.dark'
            }}
        }
        />
      <CardMedia
        sx={{height:140, backgroundSize:'contain',backgroundColor:'primary.light'}}
        component="img"
        image={product.pictureURL}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" sx={{color:'secondary.dark'}}>
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} onClick={()=>addClickHandler(product.id)} size="small" >Add to cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
    )
}