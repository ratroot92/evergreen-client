import React from 'react';
import axios from 'axios';
import ProductCard from '../components/Shop/ProductCard';
import Base from '../components/Layouts/Base';
import TopCategories from '../components/Home/TopCategories';
import BestSelling from '../components/Home/BestSelling';
import CategoriesProduct from '../components/Home/CategoriesProduct';

export async function getStaticProps() {
  try {
    const res: any = await axios.get('http://localhost:8080/api/v1/category');
    if (res.status === 200) {
      return {
        props: {
          categories: res.data,
        },
      };
    } else {
      return {
        props: {
          categories: [],
        },
      };
    }
  } catch (err: any) {
    console.log(err.message);
    return {
      props: {
        categories: [],
      },
    };
  }
}

const Products = ({ products }: any) => {
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
  const Content = () => {
    return (
      <>
        <TopCategories categories={categories} />
        <BestSelling categories={categories} />
        <CategoriesProduct categories={categories} />
      </>
    );
  };
  return <Base Component={() => <Content />}></Base>;
}
