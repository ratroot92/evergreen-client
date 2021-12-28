/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { AppContext } from '../../context/appContext'
import { ICartProduct } from '../../types/product';

 export default function CartProductList() {
   const { store } = React.useContext(AppContext);




    return (<React.Fragment> {store.cartProducts.length ? (<ul className="list list-inline">
    <li className="list-group-item d-block d-flex flex-row justify-content-between align-items-center" >
      <span className="badge text-dark">Name</span>
      <span className="badge text-dark">Image</span>
      <span className="badge text-dark">Quantity </span>
      <span className="badge text-dark">Variant</span>
      <span className="badge text-dark">Price</span>
      </li>
      {store?.cartProducts?.map((product: ICartProduct) => {
      return <li className="list-group-item d-block d-flex flex-row justify-content-between align-items-center" key={product._id}>
        <span className="badge text-dark">{product.name}</span>
        <img alt={product.name} src={product.media.coverImage} width="50" height="50" />
        <span className="badge text-dark">{product.selectedQuantity} GM </span>
        <span className="badge text-dark">{product.selectedVariant.quantity}</span>
        <span className="badge text-dark">{product.selectedVariant.price * product.selectedQuantity} Rs </span>
      </li>
    })
    
  }</ul>) : (
    <h3>No Product selected in cart</h3>
    )}</React.Fragment>)
 }
  