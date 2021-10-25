import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import validationService from '../../../services/validation.service';

// import './index.css';
const useYupValidationResolver = (validationSchema: any) =>
  React.useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

const validationSchema = yup.object({
  username: yup
    .string()
    .email()
    .email('Invalid email')
    .required('Required')
    .test('Unique Email', 'Email already in use', async function (value) {
      try {
        const res = await validationService.isAdminEmailValid(value);
        console.log('email exists =>', res);
        if (res.exists) return true;
        return false;
      } catch (err) {
        return false;
      }
      // .then((res) => {
      //   console.log(res);
      //   if (res.data.msg === 'Username already been taken') {
      //     resolve(false);
      //   }
      //   resolve(true);
      // });
      // });
    }),
  password: yup
    .string()
    .min(8, 'Not allowed')
    .max(8, 'Not allowed')
    .required('Required'),
});
function AdminLogin() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      username: 'alice@evergreen.com',
      password: 'alice@henderson',
    },
  });
  const onSubmit = async (data: any) => {
    console.log(data);
  };

  //   console.log(errors);

  return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12  ">
        <div className="card p-2 bg-dark">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="text-white">Admin Login </h1>
              </div>
              <div className="col-md-12 mt-2 mb-2 ">
                <label className="text-white  mb-2" htmlFor="username">
                  User Name
                </label>
                <input
                  className="form-control"
                  placeholder="Bill"
                  {...register('username')}
                />
              </div>

              <div className="col-md-12 mt-2 mb-2 ">
                <label className="text-white  mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  {...register('password')}
                />
              </div>
            </div>

            <div className="col-md-12 text-center mt-5 mb-5 ">
              <input type="submit" className="btn btn-sm btn-success" />
            </div>

            {/* <div style={{ color: 'red' }}>
              {Object.keys(errors).length > 0 &&
                'There are errors, check your console.'}
            </div> */}
          </form>
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
}

export default AdminLogin;
