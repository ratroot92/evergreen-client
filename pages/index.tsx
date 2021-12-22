
import React from 'react';
import axios from 'axios';
import ProductCard from '../components/Shop/ProductCard';
import Base from '../components/Layouts/Base';
import CategoryCard from '../components/Shop/CategoryCard';

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

const Products = ({ products}: any) => {
  return (
    <React.Fragment>
      {products &&
        products.map((product: any) => {
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

export default function Home({ categories }: any) {
  const CategoriesProduct = () => {
    return (
      <>
        {categories.map((cat: any) => {
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

  const TopCategories = () => {
    return (
      <div className="row">
        <div className="col-md-12 text-center mt-5 mb-5">
          <h3 className="text-success">Top Categories</h3>
        </div>
        {categories.map((cat: any) => {
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

  const BestSelling = () => {
    return (
      <div className="row">
        <div className="col-md-12 text-center mt-5 mb-5 ">
          <h3 className="text-success">Best Selling</h3>
        </div>
        {categories.map((cat: any) => {
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
        <TopCategories />
        <BestSelling />
        <CategoriesProduct />
      </>
    );
  };
  return <Base Component={() => <Content />}></Base>;
}
