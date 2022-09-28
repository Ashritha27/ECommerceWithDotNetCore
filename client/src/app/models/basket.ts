
    export interface Product {
        id: number;
        name: string;
        description: string;
        price: number;
        pictureURL: string;
        type: string;
        brand: string;
        quantityInStock: number;
    }

    export interface BasketItem {
        id: number;
        quantity: number;
        productId: number;
        price: number;
        product: Product;
        name:string;
        basketId: number;
        basket: string;
    }

    export interface Basket {
        id: number;
        buyerId: string;
        items: BasketItem[];
    }


