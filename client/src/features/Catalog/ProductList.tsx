import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard";

interface Props{
    products : Product[];
}
export default function ProductList({products}:Props){
    return (
        <>
        <Grid container spacing={4}>
            {products.map((product) => (
            <Grid item xs={12} lg={4}>
            <ProductCard product={product} key={product.id} />
            </Grid>
            ))}
        </Grid>
        </>
    )
}