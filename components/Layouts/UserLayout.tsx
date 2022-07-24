import { useRouter } from 'next/router';
import React from 'react';
import { AuthContext } from '../../context/AuthProvider';

export default function UserLayout(props: any) {
  const authContext = React.useContext(AuthContext);

  const router = useRouter();
  if (authContext !== undefined) {
    if (authContext.isAuthenticated === true) {
      router.push('/admin/dashboard');
    }
  }

  return (
    <div className="container-fluid bg-success" style={{ height: '100vh' }}>
      <div className="row " style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <div className="col-md-12">{props.children}</div>
      </div>
    </div>
  );
}
