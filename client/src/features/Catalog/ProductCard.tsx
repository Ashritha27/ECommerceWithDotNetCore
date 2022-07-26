import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props{
    product : Product;
}
export default function ProductCard({product} : Props){
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
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
    )
}