import React from 'react';
import AdminLayout from '../../../../components/Layouts/AdminLayout';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { IRole } from '../../../../redux/types/roles-type';
import TextInput from '../../../../components/Form/TextInput/TextInput';
import Label from '../../../../components/Form/Label/Label';
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
  username: yup.string().required('Required'),
  email: yup.string().required('Required'),
  password: yup.string().min(8, 'Not allowed').max(25, 'Not allowed').required('Required'),
  mobile: yup.number().required(),
  role: yup.string().required(),
});
function index() {
  const [state, setState] = React.useState({
    selectedOption: null,
    rolesOptions: [],
  });
  const roles = useSelector((state: RootState) => state.roles);
  React.useEffect(() => {
    if (roles.length) {
      setState({ ...state, rolesOptions: roles.map((rol: IRole) => ({ value: rol.name, label: rol.name })) });
    }
  }, [roles]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      // username: 'alice@evergreen.com',
      // role: 'pakistan',
      // password: 'pakistan',
      // confirmPassword: 'pakistan',
      // mobile: 'pakistan',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (err: any) {
    } finally {
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="text-dark">Admin Login </h1>
          </div>
          <div className="col-md-12 mt-2 mb-2 ">
            <Label></Label>
            <TextInput type="text" required={true} />
            {/* <input type="email" required className="form-control form-control-sm" placeholder="Bill" {...register('username')} /> */}
            {errors?.username ? <small className="text-danger">{errors.username.message}</small> : <small className="text-success">valid!</small>}
          </div>
          <Select value={state.selectedOption} onChange={() => {}} options={state.rolesOptions} />
          <div className="col-md-12 mt-2 mb-2 ">
            <label className="text-dark  mb-2" htmlFor="mobile">
              mobile
            </label>
            <input type="email" required className="form-control form-control-sm" placeholder="Bill" {...register('mobile')} />
            {errors?.mobile ? <small className="text-danger">{errors.mobile.message}</small> : <small className="text-success">valid!</small>}
          </div>

          <div className="col-md-12 mt-2 mb-2 ">
            <label className="text-dark  mb-2" htmlFor="password">
              password
            </label>
            <input required className="form-control form-control-sm" type="password" {...register('password')} />
            {errors?.password ? <small className="text-danger">{errors.password.message}</small> : <small className="text-success">valid!</small>}
          </div>

          <div className="col-md-12 mt-2 mb-2 ">
            <label className="text-dark  mb-2" htmlFor="confirmPassowrd">
              confirmPassowrd
            </label>
            <input required className="form-control form-control-sm" type="confirmPassowrd" {...register('confirmPassowrd')} />
            {errors?.confirmPassowrd ? (
              <small className="text-danger">{errors.confirmPassowrd.message}</small>
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
  );
}

index.Layout = AdminLayout;

export default index;
