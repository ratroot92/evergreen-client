/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import { useRouter } from 'next/router';
import { getStaticProps } from '..';

import React from 'react';
import ProductCard from '../../components/Shop/ProductCard';

export default function CategoryProduct() {
  const router = useRouter();
  const { cat } = router.query;

  const [state, setState] = React.useState<any>([]);
  React.useEffect(() => {
    if (cat) {
      (async function () {
        const response: any = await axios.get(
          `http://0.0.0.0:8080/api/v1/category/${cat}`
        );
        if (response.status === 200) {
          setState(response.data);
        }
      })();
    }
    else {
      router.back()
    }
  
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className='col-md-12 text-center '>
          <h3>Category : {state.name}</h3>
        </div>
        {state &&
          state.products &&
          state.products.length &&
          state.products.map((product: any) => (
            <div key={product.id} className='col-lg-3 col-md-6 col-sm-12' >
            <ProductCard product={product}/>
            </div>
          ))}
      </div>
    </div>
  );
}
