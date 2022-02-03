import React from 'react';
import AdminLayout from '../../../../components/Layouts/AdminLayout';
import { useForm } from 'react-hook-form';
import FormLayout from '../../../../components/Layouts/FormLayout';
import Label from '../../../../components/Forms/Label';
import FormGroup from '../../../../components/Forms/FormGroup';
import dataServer from '../../../../services/axios.config';
import axios from 'axios';

function AddCategory() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formValues: any) => {
    try {
      console.log('formValues.coverImage[0]', formValues.coverImage[0]);
      console.log(
        'formValues.coverImage[0]',
        Object.keys(formValues.coverImage[0])
      );

      const fd = new FormData();
      fd.append('name', formValues.name);
      fd.append('description', formValues.description);
      fd.append('coverImage', formValues.coverImage[0]);
      for (var p of fd.entries()) {
        console.log(p);
      }
      await axios
        .post(
          `http://localhost:8080/api/v1/category`,
          { data: fd },
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err.message);
        });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // console.log(watch("name")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div className="col-md-12">
        <FormLayout title="Add Category">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup label="Name" errors={errors}>
              <input
                type="text"
                className="form-control"
                placeholder="Category name"
                {...register('name', { required: true })}
              />
              <small className="text-danger">
                {errors.name && <span>This field is required</span>}
              </small>
            </FormGroup>

            <FormGroup label="Description" errors={errors}>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                {...register('description', { required: true })}
              />
              <small className="text-danger">
                {errors.description && <span>This field is required</span>}
              </small>
            </FormGroup>
            <FormGroup label="Image" errors={errors}>
              <input
                type="file"
                multiple={false}
                className="form-control"
                placeholder="Description"
                {...register('coverImage', { required: true })}
              />
              <small className="text-danger">
                {errors.coverImage && <span>This field is required</span>}
              </small>
            </FormGroup>
            <button
              className=" btn btn-sm btn-success"
              type="submit"
              style={{ width: '200px' }}
            >
              Add
            </button>
          </form>
        </FormLayout>
      </div>
    </div>
  );
}

AddCategory.Layout = AdminLayout;
export default AddCategory;
