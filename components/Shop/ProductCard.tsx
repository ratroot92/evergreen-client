/* eslint-disable @next/next/no-img-element */
import React, { FunctionComponent } from 'react';
import * as FaIcons from 'react-icons/fa';
import { ACTIONS, AppContext } from '../../context/appContext';
import { ICartProduct, IProduct, IProductVariant } from '../../types/product';
import QuantityCounter from './QuantityCounter';
import VariantSelector from './VariantSelector';

interface IProps {
  product: IProduct;
}

interface IProductCardImage {
  coverImage: string;
  salePrice: number;
}

const ProductCardImage: FunctionComponent<IProductCardImage> = ({
  coverImage,
  salePrice,
}) => {
  const style = {
    height: 'inherit',
    width: '100%',
    padding: '1px',
    borderRadius: '5px',
    position: 'relative' as 'relative',
  };
  return (
    <>
      <ProductCardPriceBanner salePrice={salePrice} />

      <img
        className="img-fluid"
        alt={coverImage}
        src={coverImage}
        style={style}
      />
    </>
  );
};

interface IProductCardPriceBanner {
  salePrice: number;
}

const ProductCardPriceBanner: FunctionComponent<IProductCardPriceBanner> = ({
  salePrice,
}) => {
  const style = {
    height: '30px',
    width: '125px',
    // zIndex:999,
    top: '20px',
    left: '12px',
    borderRadius: '3px 5px 5px 3px ',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 500,
    fontSize: '14px',
    display: 'flex',
    backgroundColor: 'green',
    position: 'absolute' as 'absolute', // cast string to type 'absolute'
    // border: "1px solid black",
  };
  return <span style={style}>Rs {salePrice} Only</span>;
};

export default function ProductCard({ product }: IProps) {
  const { store, methods } = React.useContext(AppContext);
  const [isAddedToCart, setIsAddedToCart] = React.useState<Boolean>(false);
  const [cartProduct, setCartProduct] = React.useState<ICartProduct>();
  const [variant, setVariant] = React.useState<any>(undefined);
  const [quantity, setQuantity] = React.useState<number>(0);

  /** Style Start  */
  const cardWrapper = {
    // borderRadius: "5px",
    border: '1px solid green',
    padding: '10px',
    backgroundColor: 'white',
  };
  /** Style End   */

  React.useEffect(() => {
    if (store.cartProducts.length) {
      const foundInCart = store.cartProducts.filter(
        (prod: ICartProduct) => prod._id === product._id
      )[0];
      foundInCart === undefined
        ? setIsAddedToCart(false)
        : setIsAddedToCart(true);
      setCartProduct(foundInCart);
    } else {
      setIsAddedToCart(false);
    }
  }, [product._id, store.cartProducts]);

  const addToCart = () => {
    try {
      if (variant === undefined) throw new Error('please select variant');
      if (quantity === 0) throw new Error('please select quantity');
      else {
        const payload: ICartProduct = { ...product };
        payload.selectedVariant = product.variants.filter(
          (i: IProductVariant) => i._id === variant
        )[0];
        payload.selectedQuantity = quantity;
        methods.cartReducer({
          type: ACTIONS.CART_ACTIONS.ADD_TO_CART,
          payload,
        });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <div className="card" style={cardWrapper}>
      <div className="card-img m-0 p-0" style={{ height: 'auto' }}>
        <ProductCardImage
          coverImage={product.media.coverImage}
          salePrice={product.price.salePrice}
        />
      </div>
      <div className="card-body   m-0 p-0 ">
        <div className="row ">
          <div className="col-md-12 d-flex flex-row justify-content-around align-items-center p-2  ">
            {product.variants.map((variant: IProductVariant) => {
              return (
                <span
                  key={variant._id}
                  className="badge text-dark border border-success"
                >
                  {variant.quantity} GM
                </span>
              );
            })}
          </div>
          <div className="col-md-12 mb-2  " style={{ height: '50px' }}>
            {!isAddedToCart ? (
              <div className="row">
                <div className="col-md-6 ">
                  <QuantityCounter
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                </div>
                <div className="col-md-6   ">
                  <VariantSelector
                    setVariant={setVariant}
                    variant={variant}
                    productVariants={product.variants}
                  />
                </div>
              </div>
            ) : (
              <div className="row"></div>
              // <div className='d-flex flex-column justify-content-start align-items-start '>
              //     <span className="badge text-dark">Quantity : {cartProduct?.selectedVariant?.quantity} GM </span>
              //     <span className="badge text-dark">Units : {cartProduct?.selectedQuantity}  </span>

              // <span className="badge text-dark">Price : {cartProduct?.selectedVariant?.price * cartProduct?.selectedQuantity} </span>
              // </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className={`card-footer bg-${!isAddedToCart?'success':'warning'}   pt-0 pb-0  `}> */}
      <div
        className={`card-footer bg-${
          !isAddedToCart ? 'white' : 'white'
        }   pt-2 pb-0  `}
      >
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
