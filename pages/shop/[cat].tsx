/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import { useRouter } from 'next/router';
import { getStaticProps } from '..';

import React from 'react';

// export async function getStaticProps() {
//   const { cat } = router.query;
//   const res: any = await axios.get(`http://localhost:8080/api/v1/category/${cat}`);
//   if (res.status === 200) {
//     return {
//       props: {
//         categories: res.data,
//       },
//     };
//   }
// }

export default function Products() {
  const router = useRouter();
  const { cat } = router.query;

  const [state, setState] = React.useState<any>([]);
  React.useEffect(() => {
    (async function () {
      const response: any = await axios.get(
        `http://0.0.0.0:8080/api/v1/category/${cat}`
      );
      if (response.status === 200) {
        setState(response.data);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {state &&
          state.products &&
          state.products.length &&
          state.products.map((product: any) => (
            <div key={product._id}>{product.name}</div>
          ))}
      </div>
    </div>
  );
}
