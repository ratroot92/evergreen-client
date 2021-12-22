/* eslint-disable @next/next/no-img-element */
import React from 'react';
import * as FaIcons from 'react-icons/fa';

interface IProps {
  product: any;
}

export default function ProductCard({ product }: IProps) {
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
      <div className="card-body border border-dark m-0 p-0 ">
        <div className="d-flex flex-row justify-content-around align-items-center border border-dark">
          <span>{product.name}</span>
          <span>Rs {product.price.salePrice}</span>
        </div>

        <div className="d-flex flex-row justify-content-around align-items-center border border-dark">
          {product.variants.map((variant: any, index: any) => {
            return (
              <span key={index}>
                {variant.quantity}
                {variant.unit}
                {variant.price}
              </span>
            );
          })}
        </div>
      </div>
      <div className="card-footer border border-dark m-0 p-0 ">
        <div className="d-flex flex-row justify-content-around align-items-center border border-dark">
          <button className="btn btn-success btn sm">
            <FaIcons.FaCartPlus color="white" /> Shop
          </button>
        </div>
      </div>
    </div>
  );
}
