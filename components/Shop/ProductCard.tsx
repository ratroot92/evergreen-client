/* eslint-disable @next/next/no-img-element */
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { AppContext } from '../../context/appContext';
import QuantityCounter from './QuantityCounter';
import VariantSelector from './VariantSelector';

interface IProps {
  product: any;
}

export default function ProductCard({ product }: IProps) {
  const { store, methods } = React.useContext(AppContext);
  const [isAddedToCart, setIsAddedToCart] = React.useState<Boolean>(false);
  const [cartItem, setCartItem] = React.useState<any>({});
  const [productQuantity, setProductQuantity] = React.useState<number>(0);
  const [variant, setVariant] = React.useState<any>({
    isSelected: true,
    variant: product.variants[0].variant,
  });

  // React.useEffect(() => {
  //   console.log(productQuantity);
  // }, [productQuantity]);

  React.useEffect(() => {
    console.log('variant', variant);
  }, [variant]);

  React.useEffect(() => {
    if (store.products.length) {
      const foundInCart = store.products.filter(
        (prod: any) => prod._id === product._id
      )[0];
      foundInCart === undefined
        ? setIsAddedToCart(false)
        : setIsAddedToCart(true);
      setCartItem(foundInCart);
    } else {
      setIsAddedToCart(false);
    }
  }, [product._id, store.products]);

  const addToCart = () => {
    try {
      if (variant.isSelected) {
        const newCartItem = { ...product };
        newCartItem.order = variant.variant;
        methods.cartReducer({ type: 'ADD_TO_CART', payload: newCartItem });
      } else {
        console.log('failed');
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
          // src={product.media.coverImage}
          src="https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?b=1&k=20&m=185262648&s=170667a&w=0&h=2ouM2rkF5oBplBmZdqs3hSOdBzA4mcGNCoF2P0KUMTM="
          style={{ height: 'inherit', width: '100%' }}
        />
      </div>
      <div className="card-body  m-0 p-0 ">
        <div className="d-flex flex-row justify-content-around align-items-center ">
          <span>{product.name}</span>
          <span>Rs {product.price.salePrice}</span>
        </div>
      </div>
      <div className="card-footer   pt-0 pb-0  ">
        <div className="row ">
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center ">
            {!isAddedToCart ? (
              <React.Fragment>
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <button
                    // onClick={()=>console.log())}
                    type="button"
                    style={{ width: '40px', height: '40px' }}
                  >
                    -
                  </button>
                  <input
                    min={0}
                    type="number"
                    id={'counterInput'}
                    // value={counter}
                    onChange={(e) => console.log(e.target.value)}
                    style={{ width: '60px', height: '40px' }}
                  />

                  <button
                    type="button"
                    // onClick={increment}
                    style={{ width: '40px', height: '40px' }}
                  >
                    +
                  </button>
                </div>
                <div className="d-flex flex-row justify-content-around align-items-center">
                  <label htmlFor="variantSelector">Quantity</label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        if (productQuantity === 0) {
                          alert('Select quantity');
                        } else {
                          setVariant({
                            isSelected: true,
                            variant: e.target.value,
                          });
                        }
                      }
                    }}
                    id="variantSelector"
                    className="form-control"
                    style={{ width: '100px' }}
                  >
                    {product.variants.map((variant: any, index: any) => {
                      return (
                        <option key={index} value={variant.quantity}>
                          {variant.quantity}-{variant.unit}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </React.Fragment>
            ) : (
              <span className="badge text-dark">{variant.variant} gm</span>
            )}
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center ">
            {!isAddedToCart ? (
              <button
                className="btn btn-success btn btn-sm"
                onClick={() => addToCart()}
              >
                <FaIcons.FaCartPlus color="white" /> Add{' '}
              </button>
            ) : (
              <button
                className="btn btn-warning btn btn-sm"
                onClick={() =>
                  methods.cartReducer({
                    type: 'REMOVE_FROM_CART',
                    payload: product._id,
                  })
                }
              >
                <FaIcons.FaCartPlus color="white" /> Remove{' '}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
