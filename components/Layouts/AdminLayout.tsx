import { useRouter } from 'next/router';
import React from 'react';
import { AuthContext } from '../../context/AuthProvider';
import ReactLoader from '../Loader/ReactLoading';
import AdminSidebar from '../Sidebar/AdminSidebar';

export default function AdminLayout(props: any) {
  const authContext = React.useContext(AuthContext);
  const router = useRouter();
  const [state, setState] = React.useState({ loading: true });
  React.useEffect(() => {
    if (authContext.isAuthenticated) {
      setState({ loading: false });
    } else {
      router.push('/admin/login');
    }
  }, [authContext.isAuthenticated]);

  return (
    <div className="container-fluid border-danger border" style={{ height: '100vh' }}>
      <div className="row " style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        {state.loading ? (
          <ReactLoader />
        ) : (
          <>
            <div className="col-xs-4 col-sm-4 col-md-3 col-lg-3 col-xl-3  m-0 p-0 ">
              <AdminSidebar />
            </div>
            <div className="col-xs-8 col-sm-8 col-md-9 col-lg-9 col-xl-9  ">{props.children}</div>
          </>
        )}
      </div>
    </div>
  );
}
