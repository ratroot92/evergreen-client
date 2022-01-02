import React from 'react';
import ProductCard from '../Shop/ProductCard';

export interface ICategoriesProduct {
  categories: any[];
}
const CategoriesProduct = ({ categories }: ICategoriesProduct) => {
  return (
    <>
      {categories.map((cat: any) => {
        return (
          <React.Fragment key={cat._id}>
            <h5>{cat.name}</h5>
            {cat.products.length &&
              cat.products.map((product: any) => {
                return (
                  <div
                    key={product._id}
                    className={`col-lg-4 col-md-6 col-sm-12`}
                  >
                    <ProductCard
                      key={`productCard_${product._id}`}
                      product={product}
                    />
                  </div>
                );
              })}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CategoriesProduct;
