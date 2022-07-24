import React from 'react';

import 'bootstrap/dist/css/bootstrap.css'; // Add this line
import '../styles/globals.css';
import 'react-notifications/lib/notifications.css';
import '../components/Shop/style/QuantityCounter.css';
import AppProvider from '../context/appContext';
import AdminLayout from '../components/Layouts/AdminLayout';
// import { NotificationContainer } from 'react-notifications';
// import withStyles from '@material-ui/styles/withStyles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '../context/AuthProvider';
import UserLayout from '../components/Layouts/UserLayout';
function EvergreenApp({ Component, pageProps }: any) {
  const Layout = Component.Layout ? AdminLay : UserLay;
  return (
    <AuthProvider>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </AppProvider>
    </AuthProvider>
  );
}
const UserLay = ({ children }: any) => <UserLayout>{children}</UserLayout>;
const AdminLay = ({ children }: any) => <AdminLayout>{children}</AdminLayout>;
export default EvergreenApp;
