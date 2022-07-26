import { Button } from "@mui/material";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";

interface Props{
    products : Product[];
    addProducts:(e : any) => void;
}
export default function Catalog(props : Props){
    return(
        <>
            <ProductList products={props.products} />
            <Button variant="contained" onClick={props.addProducts}>Add products</Button>
        </>
    )
}