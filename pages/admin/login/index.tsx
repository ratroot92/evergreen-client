import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import dataServer from '../../../services/axios.config';
import { AuthContext } from '../../../context/AuthProvider';
import ReactLoader from '../../../components/Loader/ReactLoading';
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
  const [state, setState] = React.useState({
    loading: true,
  });

  React.useEffect(() => {
    if (authContext.isAuthenticated) {
      router.push('/admin/dashboard');
    } else {
      if (authContext.user !== null) {
        setTimeout(() => {
          router.push('/admin/verify');
        }, 2000);
      } else {
        setState({ ...state, loading: false });
      }
    }
  }, [authContext.user]);

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
      setState({ ...state, loading: true });
      const { username, password }: any = data;
      const requestPayload: any = {
        type: 1,
        payload: username,
        password: password,
      };
      const response: any = await dataServer.post(`/auth/login`, requestPayload);
      authContext.setUser({ payload: username, type: 1 });
      toast(response.data.message);
    } catch (err: any) {
      toast(err.message);
    } finally {
      setState({ ...state, loading: true });
    }
  };

  return (
    <div className="row ">
      {state.loading === false ? (
        <>
          <div className="col-md-3"></div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  ">
            <div className="card p-5 bg-dark">
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
                    {errors?.username ? (
                      <small className="text-danger">{errors.username.message}</small>
                    ) : (
                      <small className="text-success">valid!</small>
                    )}
                  </div>

                  <div className="col-md-12 mt-2 mb-2 ">
                    <label className="text-white  mb-2" htmlFor="password">
                      Password
                    </label>
                    <input required className="form-control form-control-sm" type="password" {...register('password')} />
                    {errors?.password ? (
                      <small className="text-danger">{errors.password.message}</small>
                    ) : (
                      <small className="text-success">valid!</small>
                    )}
                  </div>
                </div>
                <div className="col-md-12 text-center mt-5 mb-5 ">
                  <input type="submit" className="btn btn-sm btn-success" />
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-3"></div>
        </>
      ) : (
        <ReactLoader color="#000" />
      )}
    </div>
  );
}

export default AdminLogin;
