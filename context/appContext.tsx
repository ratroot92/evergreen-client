/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import { useMethods } from 'react-use';
import { ICartProduct } from '../types/product';



export interface ICart {
    [key: string]: any;
}
export interface ICartContext {
    methods: any;
    store: any;
    
}

export interface IInitialState{
    cartProducts: ICartProduct[],
    totalPrice:number
}


const initialState:IInitialState = {
  cartProducts: [],
  totalPrice:0
};

function createMethods(store:any) {
  return {
    reset() {
      return initialState;
    },
    cartReducer(action:{type:string,payload:any}) {
        switch (action.type) {
            case "ADD_TO_CART":
            console.log("action",action)
                return {
                ...store,
                cartProducts:store.cartProducts.concat(action.payload)
                }
            case "REMOVE_FROM_CART":
                    return {
                    ...store,
                    cartProducts:store.cartProducts.filter((prod:ICartProduct)=>prod._id!==action.payload)
                    }
            
            case "UPDATE_TOTAL_PRICE":
                console.log("action",action)
                        return {
                        ...store,
                        totalPrice:action.payload,
                        }
            default:
                return {...store}
      }
    },
  
  };
}




export const ACTIONS = {
    CART_ACTIONS: {
        UPDATE_TOTAL_PRICE: "UPDATE_TOTAL_PRICE",
        REMOVE_FROM_CART: "REMOVE_FROM_CART",
        ADD_TO_CART: "ADD_TO_CART"
    }

}

export const AppContext = React.createContext<ICartContext | any>(
    initialState,
) as React.Context<ICartContext>;

const AppProvider = ({ children }: any) => {
    const [store, methods] = useMethods(createMethods, initialState);
    const [loading,setLoading]=React.useState<boolean>(true)


    React.useEffect(() => {

        setLoading(false)   
    }, [])
    

/** Calculate Total Price Start  */
    React.useEffect(() => {
        if (store.cartProducts.length) {
           const totalPrice:number= store.cartProducts.reduce<number>(function (totalPrice: number, product: ICartProduct) {
               totalPrice += product.selectedVariant.price * product.selectedQuantity;
               return totalPrice
            },0)
           methods.cartReducer({type:ACTIONS.CART_ACTIONS.UPDATE_TOTAL_PRICE,payload:totalPrice})
        }
    }, [store.cartProducts])
/** Calculate Total Price Start  */
    
   
    return (

<>
            {loading ? (<>loading</>) : (
                <AppContext.Provider
                    value={{    
                    store,
                    methods
                    }}
                >
                    {children}
                </AppContext.Provider>)}            
               
        </>

    );
};

export default AppProvider