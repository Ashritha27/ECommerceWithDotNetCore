import { createContext, useReducer } from "react";

export const Store = createContext('');

const initialState = {
     cartCount : 0
}
const reducer = (state : any,action : any) => {
    switch(action.type){
        case 'ADD_CART':
            return {...state,cartCount: action.payload.cartCount}
        default:
            return state;
    }

}
 export function StoreProvider(props:any){
    const [state,dispatch] = useReducer(reducer,initialState);
    const value = {state,dispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
 }