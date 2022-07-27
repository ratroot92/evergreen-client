import React from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/Layouts/AdminLayout';
import ReactLoader from '../../../../components/Loader/ReactLoading';
import { useSelector, useDispatch } from 'react-redux';
import { startSetLoader } from '../../../../redux/actions/loader-actions';
import { RootState } from '../../../../redux/store/configureStore';
import { startDeleteRole, startSetRoles } from '../../../../redux/actions/role-actions';
import { IRole } from '../../../../redux/types/roles-type';
function AllRoles() {
  const dispatch = useDispatch();
  const roles: IRole[] = useSelector((state: RootState) => state.roles);
  const loading: boolean = useSelector((state: RootState) => state.loading);

  React.useEffect(() => {
    dispatch(startSetLoader(true));
    dispatch(startSetRoles());
    dispatch(startSetLoader(false));
  }, []);

  async function handleEdit(e: any) {}

  async function handleDelete(e: any) {
    try {
      dispatch(startSetLoader(true));
      dispatch(startDeleteRole(e.target.id));
      dispatch(startSetLoader(false));
    } catch (err: any) {
      toast(err.message);
    }
  }

  return (
    <div className="row">
      {loading ? (
        <ReactLoader></ReactLoader>
      ) : (
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {roles?.map((user: any, index: Number) => {
                return (
                  <tr key={user?._id}>
                    <th scope="row">{++index}</th>
                    <td>{user?.name}</td>

                    <td>
                      <span id={user?._id} className="btn btn-sm btn-success" onClick={handleEdit}>
                        edit
                      </span>
                    </td>
                    <td>
                      <span id={user?._id} className="btn btn-sm btn-danger " onClick={handleDelete}>
                        del
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

AllRoles.Layout = AdminLayout;

export default AllRoles;
