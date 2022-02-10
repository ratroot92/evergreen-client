import React from 'react'

import 'bootstrap/dist/css/bootstrap.css'; // Add this line
import '../styles/globals.css'
import 'react-notifications/lib/notifications.css';
import '../components/Shop/style/QuantityCounter.css'
import AppProvider from '../context/appContext';
import AdminLayout from '../components/Layouts/AdminLayout';
import {NotificationContainer} from 'react-notifications';
import withStyles from '@material-ui/styles/withStyles';
function EvergreenApp({ Component, pageProps }: any) {
  const Layout = Component.Layout?AdminLay: UserLayout;
  return (
    <AppProvider>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    <NotificationContainer/>
    </AppProvider>
  )
}
const UserLayout = ({ children }:any) => <>{children}</>
const AdminLay = ({ children }:any) => <AdminLayout>{children}</AdminLayout>
export default EvergreenApp;