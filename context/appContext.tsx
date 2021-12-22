/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import { useMethods } from 'react-use';



interface ICart {
    [key: string]: any;
}
interface ICartContext {
    methods: any;
    store: any;
    
}


const initialState = {
  products: [],
};

function createMethods(store:any) {
  return {
    reset() {
      return initialState;
    },
    cartReducer(action:{type:string,payload:any}) {
        switch (action.type) {
            case "ADD_TO_CART":
                return {
                ...store,
                products:store.products.concat(action.payload)
                }
            case "REMOVE_FROM_CART":
                console.log(action)
                    return {
                    ...store,
                    products:store.products.filter((prod:any)=>prod._id!==action.payload)
                    }
            default:
                return {...store}
      }
    },
  
  };
}



export const AppContext = React.createContext<ICartContext | any>(
    initialState,
) as React.Context<ICartContext>;

const AppProvider = ({ children }: any) => {
    const [store, methods] = useMethods(createMethods, initialState);
    // const [store, methods] = React.useState<ICart>({
    //     products: [],
    // });
    const [loading,setLoading]=React.useState(true)


    React.useEffect(() => {
        setLoading(false)   
    },[])

    React.useEffect(() => {
        console.log("store changed ==>",{store})
   },[store])
   
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