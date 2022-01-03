/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { AppContext } from '../../context/appContext'
import { ICartProduct } from '../../types/product';

 export default function CartProductsTable() {
   const { store } = React.useContext(AppContext);
   


   return (<React.Fragment> {store.cartProducts.length ? (
     <table className="table">
       <thead>
    <tr>
<th scope="row">Name</th >
<th scope="row">Image</th >
<th scope="row">Quantity</th >
<th scope="row">Variant</th >
<th scope="row">Price</th >
    </tr>
    </thead>
    <tbody>
         {store?.cartProducts?.map((product: ICartProduct) => {
           return (<tr key={product._id}>
             <td className=" text-dark">{product.name}</td>
             <td><img alt={product.name} className="img-fluid" src={product.media.coverImage} width="50" height="50" /></td>
             <td className=" text-dark">{product.selectedQuantity}</td>
             <td className=" text-dark">{product.selectedVariant.quantity} GM </td>
             <td className=" text-dark">Rs {product.selectedVariant.price * product.selectedQuantity}  </td>
           </tr>
           )
         })}
         <tr>
           <td></td>
         <td></td>
           
         <td></td>

         <td></td>
           
           <td>Rs {store.totalPrice}  </td>
           
         </tr>
    </tbody>
</table>) : (
    <h3>No Product selected in cart</h3>
    )}</React.Fragment>)
 }
  