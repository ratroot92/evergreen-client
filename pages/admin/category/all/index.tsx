import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import dataServer from '../../../../services/axios.config';
import MUIDataTable from 'mui-datatables';
import { ICategory } from '../../../../types/category';
import Image from 'next/image';
import * as FaIcons from 'react-icons/fa'
import AdminLayout from '../../../../components/Layouts/AdminLayout';
import DeleteIcon from '../../../../components/Icons/DeleteIcon';
import {NotificationManager} from 'react-notifications'
export async function getStaticProps() {
  try {
    const res: any = await dataServer.get('/category');
    if (res.status === 200) {
      return {
        props: {
          categories: res.data.map((cat: ICategory) => {
            cat.id = cat._id;
            return cat;
          }),
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



 /** Table Actions Start */ 
 async  function deleteCategory(catId:string){
    try{
     const {data}= await dataServer.delete(`/category/${catId}`);
     NotificationManager.success("success")
    }
    catch(err:any){
      NotificationManager.error(err.message)
    }
  }
 /** Table Actions End */ 




  const columns = [
    {
      name: '_id',
      label: 'Id',
      options: {
        display: true,
        filter: true,
        customBodyRender: (value:string) => value,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        display: true,
        filter: true,
        customBodyRender: (value:string) => value,
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        display: true,
        filter: true,
        customBodyRender: (value:string) => value,
      },
    },
    {
      name: 'coverImage',
      label: 'Image',
      options: {
        display: true,
        filter: false,
        customBodyRender:(value:string) => {
          console.log(process.env.publicAssetsUrl, value);
          return (
            <Image
              alt={value}
              src={`${process.env.publicAssetsUrl}${value}`}
              className="img-thumbnail"
              height="100"
              width="100"
            />
          );
        },
      },
    
    },
    {
      name: '_id',
      label: 'Actions',
      options: {
        display: true,
        filter: true,
        customBodyRender:(value:string) => {
          console.log(process.env.publicAssetsUrl, value);
          return (
         <button onClick={(e)=>deleteCategory(value)} className='iconWrapperBtn'><DeleteIcon/></button>
          );
        },
      },
    
    },
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard"// ["standard","vertical","verticalAlways","simple"].

};


  return (
    <div style={{ height: 300, width: '100%' }}>
      <MUIDataTable
        data={categories}
        columns={columns}
        options={options}
      />
    </div>
  );
};

AllCategories.Layout = AdminLayout;
export default AllCategories;
