/* eslint-disable no-unused-vars */

import React, { FunctionComponent } from 'react'; // importing FunctionComponent

import axios from 'axios';
import ProductCard from '../components/Shop/ProductCard';
import Base from '../components/Layouts/Base';
import CategoryCard from '../components/Shop/CategoryCard';
import { ICategory } from '../types/category';
import { IProduct } from '../types/product';

export async function getStaticProps() {
  const res: any = await axios.get('http://localhost:8080/api/v1/category');
  if (res.status === 200) {
    return {
      props: {
        categories: res.data,
      },
    };
  }
  else {
    return {
      props: {
        categories: [],
      },
    }
  }
}




interface  IProducts{
  products: IProduct[],
  cols:number
}
const Products:FunctionComponent<IProducts>= (props) => {
  const { products } = props;
  return (
    <React.Fragment>
      {products &&
        products.map((product: IProduct) => {
          return (
            <div key={product._id} className={`col-lg-4 col-md-6 col-sm-12`}>
              <ProductCard
                key={`productCard_${product._id}`}
                product={product}
              />
            </div>
          );
        })}
    </React.Fragment>
  );
};



interface IHome{
  categories: ICategory[],
  
}
  const Home:FunctionComponent<IHome>=(props)=> {
  const { categories } = props;
  const CategoriesProduct = () => {
    return (
      <>
        {categories.map((cat: ICategory) => {
          return (
            <React.Fragment key={cat._id}>
              <h3>{cat.name}</h3>
              <Products products={cat.products.slice(0, 3)} cols={4} />
            </React.Fragment>
          );
        })}
      </>
    );
  };

  const TopCategories:FunctionComponent= () => {
    return (
      <div className="row">
        <div className="col-md-12 text-center mt-5 mb-5">
          <h3 className="text-success">Top Categories</h3>
        </div>
        {categories.map((cat: ICategory) => {
          return (
            <div
              key={cat._id}
              className="col-lg-3 col-md-6 col-sm-12 "
              style={{ height: '300px' }}
            >
              <CategoryCard category={cat} />
            </div>
          );
        })}
      </div>
    );
  };

  const BestSelling:FunctionComponent= () => {
    return (
      <div className="row">
        <div className="col-md-12 text-center mt-5 mb-5 ">
          <h3 className="text-success">Best Selling</h3>
        </div>
        {categories.map((cat: ICategory) => {
          return (
            <div
              key={cat._id}
              className="col-lg-3 col-md-6 col-sm-12"
              style={{ height: '300px' }}
            >
              <CategoryCard category={cat} />
            </div>
          );
        })}
      </div>
    );
  };

  const Content = () => {
    return (
      <>
        {/* <TopCategories />
        <BestSelling /> */}
        <CategoriesProduct />
      </>
    );
  };
  return <Base Component={() => <Content />}></Base>;
}


export default Home