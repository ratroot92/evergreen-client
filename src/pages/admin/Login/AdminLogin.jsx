/* eslint-disable*/
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { startSetLogin } from '../../../redux/actions/auth-actions';
import './AdminLogin.css';
import backgroundImage from '../../../assets/images/admin_login.jpg';
import { useNavigate } from 'react-router-dom';
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
  password: yup.string().min(8, 'Not allowed').max(25, 'Not allowed').required('Required'),
});
function AdminLogin(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoginSuccessfull, isOtpVerified } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isLoginSuccessfull && !isOtpVerified) {
      return navigate('/admin/otp');
    } else if (isLoginSuccessfull && isOtpVerified) {
      return navigate('/admin/dashboard');
    }
  }, [isLoginSuccessfull]);

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
      dispatch(startSetLogin(requestPayload));
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className="row ">
      <div className="col-md-6  left-half-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="row ">
          <div className="col-md-12 g-center-r">
            <h1>Evergreen</h1>
          </div>
        </div>
      </div>

      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  right-half-wrapper  ">
        <div className="row">
          <div className="col-md-12">
            <h3 className="c-form-title">Login</h3>
          </div>
          <div className="col-md-12  ">
            <form className="c-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
              <div className="c-input-wrapper">
                <label className="c-label" htmlFor="username">
                  User Name
                </label>
                <input type="email" required className="c-input " placeholder="Bill" {...register('username')} />
                {errors?.username ? (
                  <small className="c-input-error-invalid">{errors.username.message}</small>
                ) : (
                  <small className="c-input-error-valid">valid!</small>
                )}
              </div>

              <div className="c-input-wrapper">
                <label className="c-label" htmlFor="password">
                  Password
                </label>
                <input required className="c-input " type="password" {...register('password')} />
                {errors?.password ? (
                  <small className="c-input-error-invalid">{errors.password.message}</small>
                ) : (
                  <small className="c-input-error-valid">valid!</small>
                )}
              </div>
              <div className="col-md-12 text-center  ">
                <input type="submit" className="btn  btn-success" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
