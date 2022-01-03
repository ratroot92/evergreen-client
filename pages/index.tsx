/* eslint-disable no-unused-vars */

import React, { FunctionComponent } from 'react'; // importing FunctionComponent

import axios from 'axios';
import ProductCard from '../components/Shop/ProductCard';
import Base from '../components/Layouts/Base';
import CategoryCard from '../components/Shop/CategoryCard';
import { ICategory } from '../types/category';
import { IProduct } from '../types/product';
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

interface IHome {
  categories: ICategory[];
}
const Home: FunctionComponent<IHome> = (props) => {
  const { categories } = props;

  const TopCategories: FunctionComponent = () => {
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

  const BestSelling: FunctionComponent = () => {
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
        <CategoriesProduct categories={categories} />
      </>
    );
  };
  return <Base Component={() => <Content />}></Base>;
};

export default Home;
