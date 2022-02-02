import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import dataServer from '../../../../services/axios.config';
import { DataGrid ,} from '@mui/x-data-grid';
import { IProduct } from '../../../../types/product';

export async function getStaticProps() {
  try {
    const res: any = await dataServer.get('/product');
    if (res.status === 200) {
      return {
        props: {
          products: res.data,
        },
      };
    } else {
      return {
        props: {
          products: [],
        },
      };
    }
  } catch (err: any) {
    console.log(err.message);
    return {
      props: {
        products: [],
      },
    };
  }
}

interface IAllProducts {
  products: IProduct[];
}
const AllProducts: FunctionComponent<IAllProducts> = (props) => {
  const { products } = props;
  console.log("products",products)

  // media: IProductMedia,
  // stats: IProductStats,
  // variants:IProductVariant,
  const columns = [
    { field: '_id', headerName: 'Id', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'isAvaialible', headerName: 'isAvaialible', width: 150 },
    { field: 'isDeleted', headerName: 'isDeleted', width: 150 },
    { field: 'price', headerName: 'price', width: 150 },
  ]

  return (
    
    <div style={{ height: 300, width: '100%' }}>
    <DataGrid
    rows={products}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    checkboxSelection
      />
      </div>)
}


export default AllProducts