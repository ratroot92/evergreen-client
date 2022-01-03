import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import { ICategory } from '../../types/category';
import { IProduct } from '../../types/product';
import ProductCard from '../Shop/ProductCard';

interface ICategoriesProduct {
  categories: ICategory[];
}

const CategoriesProduct: FunctionComponent<ICategoriesProduct> = (props) => {
  const { categories } = props;
  return (
    <>
      {categories.map((cat: ICategory) => {
        return (
          <React.Fragment key={cat._id}>
            <div className="col-md-12  text-center p-3">
              <h4 className="text-uppercase">{cat.name}</h4>
            </div>
            <>
              {cat?.products.length > 0 ? (
                <>
                  {cat.products &&
                    cat.products.map((product: IProduct) => {
                      return (
                        <div
                          key={product._id}
                          className={`col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-2`}
                        >
                          <ProductCard
                            key={`productCard_${product._id}`}
                            product={product}
                          />
                        </div>
                      );
                    })}
                </>
              ) : (
                <div className="col-md-12 text-center">
                  <h5 className="text-success">{cat.name} has no prodcuts.</h5>
                </div>
              )}
            </>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CategoriesProduct;
