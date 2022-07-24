import React from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/Layouts/AdminLayout';
import ReactLoader from '../../../../components/Loader/ReactLoading';
import dataServer from '../../../../services/axios.config';
import { useSelector, useDispatch } from 'react-redux';
import { startDeleteUser, startSetUser } from '../../../../redux/actions/user-actions';
import { startSetLoader } from '../../../../redux/actions/loader-actions';
import { RootState } from '../../../../redux/store/configureStore';
function AllUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const loading = useSelector((state: RootState) => state.loading);

  React.useEffect(() => {
    dispatch(startSetLoader(true));
    dispatch(startSetUser());
    dispatch(startSetLoader(false));
  }, []);

  async function handleEdit(e: any) {}

  async function handleDelete(e: any) {
    try {
      dispatch(startSetLoader(true));
      dispatch(startDeleteUser(e.target.id));
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
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Role</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: any, index: Number) => {
                return (
                  <tr key={user?._id}>
                    <th scope="row">{++index}</th>
                    <td>{user?.username}</td>
                    <td>{user?.email}</td>
                    <td>{user?.mobile}</td>
                    <td>{user?.role?.name || 'role'}</td>
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

AllUsers.Layout = AdminLayout;

export default AllUsers;
