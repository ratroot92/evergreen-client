import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import dataServer from '../../../../services/axios.config';
import { DataGrid ,GridRenderCellParams} from '@mui/x-data-grid';
import { ICategory } from '../../../../types/category';
import Image from 'next/image'
export async function getStaticProps() {
  try {
    const res: any = await dataServer.get('/category');
    if (res.status === 200) {
      return {
        props: {
          categories: res.data.map((cat:ICategory) => { cat.id = cat._id; return cat;})
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

interface IAllCategories {
  categories: ICategory[];
}
const AllCategories: FunctionComponent<IAllCategories> = (props) => {
  const { categories } = props;


  // valueSetter: setFullName,
  // function setFullName(params: GridValueSetterParams) {
  //   const [firstName, lastName] = params.value!.toString().split(' ');
  //   return { ...params.row, firstName, lastName };
  // }


  // function getFullName(params) {
  //   return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
  // }
  // valueGetter: getFullName,


  const myLoader = ({ src, width, quality }:any) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  }
  const columns = [
    { field: '_id', headerName: 'Id', width: 150, minWidth: 150, maxWidth: 200 },
    { field: 'name', headerName: 'Name', width: 150, minWidth: 150, maxWidth: 200},
    { field: 'stock', headerName: 'Stock', width: 150, minWidth: 150, maxWidth: 200},
    { field: 'description', headerName: 'Description', width: 150, minWidth: 150, maxWidth: 200},
    {
      field: 'coverImage', headerName: 'Image', width: 150, minWidth: 150, maxWidth: 200, renderCell: (params: GridRenderCellParams<string>) => {
        console.log("params", params,process.env);
        return(<Image   alt={params.value} src={`${process.env.publicAssetsUrl}${params.value}`} className="img-thumbnail" height="40" width="40"/>)
    
        
    }},

 
  ]

  return (
    
    <div style={{ height: 300, width: '100%' }}>
    <DataGrid
    rows={categories}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    checkboxSelection
      />
      </div>)
}


export default AllCategories