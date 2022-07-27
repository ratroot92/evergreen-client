/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

// export default function AdminRoutes({ element: Component, ...rest }) {
//   const auth = useSelector((state) => state.auth);
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (auth.login) {
//           return <Navigate to="/admin/otp" />;
//         }
//         return <Component />;
//       }}
//     />
//   );
// }

function AdminRoute({ children, redirectTo }) {
  const auth = useSelector((state) => state.auth);
  return !auth.login ? children : <Navigate to={redirectTo} />;
}

export default AdminRoute;
