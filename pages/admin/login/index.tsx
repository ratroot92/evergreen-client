import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import userService from '../../../services/auth.service';
import validationService from '../../../services/validation.service';
import { AuthContext } from '../../../utils/AuthProvider';
import { useRouter } from 'next/router'
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
    .email('Invalid email')
    .required('Required')
    .test('email', 'Email already in use', async function (value) {
      try {
        if (value === "") return false
        const { msg, exists } = await validationService.isAdminEmailValid(value);
        if (exists) return true;
        return false;
      } catch (err) {
        return false;
      }
    }),
  password: yup
    .string()
    .min(8, 'Not allowed')
    .max(25, 'Not allowed')
    .required('Required'),
});
function AdminLogin() {

  const authContext = React.useContext(AuthContext);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      username: 'alice@evergreen.com',
      password: 'alicehenderson',
    },
  });
  const onSubmit = async (data: any) => {
    try {
      const res = await userService.login(data)
      localStorage.setItem("access_token", res);
      authContext.setIsAuthenticated(true);
      authContext.setUser(data);
      router.push('/admin/dashboard')
    }
    catch (err: any) {
      console.log(err.message)
    }
  };


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
                  type="email"
                  required
                  className="form-control form-control-sm"
                  placeholder="Bill"
                  {...register('username')}
                />
                {errors?.username ? (<small className="text-danger">{errors.username.message}</small>) : (<small className="text-success">valid!</small>)}

              </div>

              <div className="col-md-12 mt-2 mb-2 ">
                <label className="text-white  mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  required
                  className="form-control form-control-sm"
                  type="password"
                  {...register('password')}
                />
                {errors?.password ? (<small className="text-danger">{errors.password.message}</small>) : (<small className="text-success">valid!</small>)}
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
