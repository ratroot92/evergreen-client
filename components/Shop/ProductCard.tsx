/* eslint-disable @next/next/no-img-element */
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { ACTIONS, AppContext } from '../../context/appContext';
import { ICartProduct, IProduct, IProductVariant } from '../../types/product';
import QuantityCounter from './QuantityCounter';
import VariantSelector from './VariantSelector';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const { store, methods } = React.useContext(AppContext);
  const [isAddedToCart, setIsAddedToCart] = React.useState<Boolean>(false);
  const [cartItem, setCartItem] = React.useState<any>({});
  const [variant, setVariant] = React.useState<any>(undefined);
  const [quantity,setQuantity]=React.useState<number>(0);




  React.useEffect(() => {
    if (store.cartProducts.length) {
      const foundInCart = store.cartProducts.filter(
        (prod: ICartProduct) => prod._id === product._id
      )[0];
      foundInCart === undefined
        ? setIsAddedToCart(false)
        : setIsAddedToCart(true);
      setCartItem(foundInCart);
    } else {
      setIsAddedToCart(false);
    }
  }, [product._id, store.cartProducts]);



  const addToCart = () => {
    try {
      if (variant === undefined) throw new Error("please select variant")
      if (quantity === 0)throw new Error("please select quantity")
      else {
        const payload:ICartProduct = { ...product };
        payload.selectedVariant = product.variants.filter((i: IProductVariant) => (i._id === variant))[0];
        payload.selectedQuantity = quantity;
        methods.cartReducer({
          type: ACTIONS.CART_ACTIONS.ADD_TO_CART, payload})
      }
        
        
       
      
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <div className="card">
      <div className="card-header m-0 p-0" style={{ height: '200px' }}>
        <img
          className="img-fluid"
          alt={product.name}
          src={product.media.coverImage}
          style={{ height: 'inherit', width: '100%' }}
        />
      </div>
      <div className="card-body   m-0 p-0 ">
        <div className="row ">
          <div className='col-md-12'>
        {!isAddedToCart ? (
              <React.Fragment>
                <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
                <VariantSelector setVariant={setVariant} variant={variant}  productVariants={product.variants}/>
              </React.Fragment>
          ) : (
              <div className='d-flex flex-column justify-content-start align-items-start '>
                  <span className="badge text-dark">Quantity : {cartItem.selectedVariant.quantity} GM </span>
                  <span className="badge text-dark">Units : {cartItem.selectedQuantity}  </span>
                  
              <span className="badge text-dark">Price : {cartItem.selectedVariant.price * cartItem.selectedQuantity} </span>
              </div>
            )}
            </div>
        </div>
      </div>
      <div className={`card-footer bg-${!isAddedToCart?'success':'warning'}   pt-0 pb-0  `}>

            {!isAddedToCart ? (
              <button
                className="btn btn-success w-100 btn btn-sm"
                onClick={() => addToCart()}
              >
                <FaIcons.FaCartPlus color="white" /> Add{' '}
              </button>
            ) : (
              <button
                className="btn btn-warning w-100 btn btn-sm"
                onClick={() =>
                  methods.cartReducer({
                    type: ACTIONS.CART_ACTIONS.REMOVE_FROM_CART,
                    payload: product._id,
                  })
                }
              >
                <FaIcons.FaCartPlus color="white" /> Remove{' '}
              </button>
            )}
          </div>
    </div>
  );
}
