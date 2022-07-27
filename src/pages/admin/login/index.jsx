/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { startSetLogin } from '../../../redux/actions/auth-actions';

const useYupValidationResolver = (validationSchema) =>
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
  // const router = useRouter();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth);

  React.useEffect(() => {
    console.log('loginState ==>', loginState);
  }, [loginState]);

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

  const onSubmit = async (data) => {
    try {
      const { username, password } = data;
      const requestPayload = {
        type: 1,
        payload: username,
        password,
      };
      dispatch({ type: 'SET_LOGIN_TYPE', payload: { type: 1, payload: username } });
      dispatch(startSetLogin(requestPayload));
      // toast(response.data.message);
    } catch (err) {
      toast(err.message);
    } finally {
      // setState({ ...state, loading: true });
    }
  };

  return (
    <div className="row ">
      <div className="col-md-3" />
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
      <div className="col-md-3" />
    </div>
  );
}

export default AdminLogin;
