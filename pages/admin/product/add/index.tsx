import React from 'react';
import AdminLayout from '../../../../components/Layouts/AdminLayout';
import { useForm } from 'react-hook-form';
import FormLayout from '../../../../components/Layouts/FormLayout';
import FormGroup from '../../../../components/Forms/FormGroup';
import { NotificationManager } from 'react-notifications';
import dataServer from '../../../../services/axios.config';

function AddProduct() {
  const variantWrapperDiv = React.useRef(null);
  const [state, setState] = React.useState<any>({
    variantCount: 0,
    variants: [],
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formValues: any) => {
    try {
      const fd = new FormData();
      fd.append('name', formValues.name);
      fd.append('description', formValues.description);
      fd.append('coverImage', formValues.coverImage[0]);
      const { data } = await dataServer.post(`/category`, fd);
      NotificationManager.success('success');
      reset();
    } catch (err: any) {
      NotificationManager.error(err.message);
    }
  };

  const Variants = () => {
    const [state, setState] = React.useState({
      isWeightSelected: false,
      weight: 0,
      variantprice: 0,
    });
    return (
      <div>
        <select className=" selectSm" onChange={(e) => ({ ...state, isWeightSelected: true, wieight: +e.target.value })}>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="250">250</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
        {state?.isWeightSelected ? <input type="number" className="" onChange={(e) => ({ ...state, variantPrice: +e.target.value })} /> : <></>}
      </div>
    );
  };

  React.useEffect(() => {
    for (let i = 0; i < state.variantCount; i++) {
      state.variants.push(<Variants key={i} />);
    }
  }, [state.variantCount]);

  return (
    <div className="row">
      <div className="col-md-12">
        <FormLayout title="Add Category">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup label="Name" errors={errors}>
              <input type="text" className="form-control" placeholder="Category name" {...register('name', { required: true })} />
              <small className="text-danger">{errors.name && <span>This field is required</span>}</small>
            </FormGroup>

            <FormGroup label="Sale Price" errors={errors}>
              <input type="number" className="form-control" placeholder="Sale price" {...register('name', { required: true })} />
              <small className="text-danger">{errors.name && <span>This field is required</span>}</small>
            </FormGroup>

            <FormGroup label="Purchase Price" errors={errors}>
              <input type="number" className="form-control" placeholder="Purchase price" {...register('name', { required: true })} />
              <small className="text-danger">{errors.name && <span>This field is required</span>}</small>
            </FormGroup>

            <FormGroup label="Stock" errors={errors}>
              <input type="number" className="form-control" placeholder="Stock" {...register('name', { required: true })} />
              <small className="text-danger">{errors.name && <span>This field is required</span>}</small>
            </FormGroup>

            <FormGroup label="Description" errors={errors}>
              <input type="text" className="form-control" placeholder="Description" {...register('description', { required: true })} />
              <small className="text-danger">{errors.description && <span>This field is required</span>}</small>
            </FormGroup>
            <FormGroup label="Image" errors={errors}>
              <input
                type="file"
                multiple={false}
                className="form-control"
                placeholder="Description"
                {...register('coverImage', { required: true })}
              />
              <small className="text-danger">{errors.coverImage && <span>This field is required</span>}</small>
            </FormGroup>
            <button type="button" onClick={() => setState(() => ({ ...state, variantCount: state.variantCount + 1 }))}>
              add variant
            </button>
            <div id="variants" ref={variantWrapperDiv}>
              {state.variants && state.variants}
            </div>
            <button className=" btn btn-sm btn-success" type="submit" style={{ width: '200px' }}>
              Add
            </button>
          </form>
        </FormLayout>
      </div>
    </div>
  );
}

AddProduct.Layout = AdminLayout;
export default AddProduct;
