import React, { SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/Layouts/AdminLayout';
import ReactLoader from '../../../../components/Loader/ReactLoading';
import { AuthContext } from '../../../../context/AuthProvider';
import dataServer from '../../../../services/axios.config';

function AllUsers(props: any) {
  const [state, setState] = React.useState({ loading: true, users: [] });
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      try {
        dataServer.defaults.baseURL = 'http://0.0.0.0:8002/api';
        const response = await dataServer.get(`/user`);
        const users = response.data.data;
        setState({ ...state, users: users, loading: false });
      } catch (err) {
        setState({ ...state, users: [], loading: false });
      }
    })();
  }, []);

  async function handleEdit(e: any) {
    console.log(e.target.id);
  }

  async function handleDelete(e: any) {
    try {
      setState({ ...state, loading: true });
      dataServer.defaults.baseURL = 'http://0.0.0.0:8002/api';
      const requestPayload = { data: { _id: e.target.id } };
      await dataServer.delete(`/user`, requestPayload);
      console.log(state.users.filter(({ _id }) => _id !== e.target.id));
      setState({ ...state, users: state.users.filter(({ _id }) => _id !== e.target.id) });
    } catch (err: any) {
      toast(err.message);
    } finally {
      setState({ ...state, loading: false });
    }
  }

  return (
    <div className="row">
      {state.loading ? (
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
              {state.users?.map((user: any, index: Number) => {
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
