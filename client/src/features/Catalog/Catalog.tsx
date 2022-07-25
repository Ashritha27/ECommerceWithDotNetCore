import { Product } from "../../app/models/product"

interface Props{
    products : Product[];
    addProducts:(e : any) => void;
}
export default function Catalog(props : Props){
    return(
        <>
            <ul>
            {props.products.map((product) => (
            <li key={product.name}>{product.name} - {product.price}</li>
            ))}
             </ul>
            <button onClick={props.addProducts}>Add products</button>
        </>
    )
}