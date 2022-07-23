import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import validationService from '../../../services/validation.service';
import { AuthContext } from '../../../utils/AuthProvider';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dataServer from '../../../services/axios.config';
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
      } catch (errors: any) {
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
  username: yup.string().email('Invalid email').required('Required'),
  // .test('email', 'Email already in use', async function (value) {
  //   try {
  //     if (value === "") return false
  //     const { msg, exists } = await validationService.isAdminEmailValid(value);
  //     if (exists) return true;
  //     return false;
  //   } catch (err) {
  //     return false;
  //   }
  // }),
  password: yup.string().min(8, 'Not allowed').max(25, 'Not allowed').required('Required'),
});
function AdminLogin() {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      username: 'alice@evergreen.com',
      password: 'pakistan',
    },
  });
  const onSubmit = async (data: any) => {
    try {
      const { username, password }: any = data;
      const requestPayload: any = {
        type: 1,
        payload: username,
        password: password,
      };
      const response: any = await dataServer.post(`/auth/login`, requestPayload);
      localStorage.setItem('user', JSON.stringify({ payload: username, type: 1 }));
      toast(response.data.message);
      setTimeout(() => {
        router.push('/admin/verify');
      }, 2000);

      // authContext.setIsAuthenticated(true);
      // authContext.setUser(data);
    } catch (err: any) {
      toast(err.message);
    }
  };

  return (
    <div className="row bg-success" style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
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
                <input type="email" required className="form-control form-control-sm" placeholder="Bill" {...register('username')} />
                {errors?.username ? <small className="text-danger">{errors.username.message}</small> : <small className="text-success">valid!</small>}
              </div>

              <div className="col-md-12 mt-2 mb-2 ">
                <label className="text-white  mb-2" htmlFor="password">
                  Password
                </label>
                <input required className="form-control form-control-sm" type="password" {...register('password')} />
                {errors?.password ? <small className="text-danger">{errors.password.message}</small> : <small className="text-success">valid!</small>}
              </div>
            </div>

            <div className="col-md-12 text-center mt-5 mb-5 ">
              <input type="submit" className="btn btn-sm btn-success" />
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-4"></div>
      <ToastContainer />
    </div>
  );
}

export default AdminLogin;
