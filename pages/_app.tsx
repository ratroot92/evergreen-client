import React from 'react'

import 'bootstrap/dist/css/bootstrap.css'; // Add this line
import '../styles/globals.css'
import '../components/Shop/style/QuantityCounter.css'
import AppProvider from '../context/appContext';
import AdminLayout from '../components/Layouts/AdminLayout';

function EvergreenApp({ Component, pageProps }: any) {
  const Layout = Component.Layout || AdminLay;
  return (
    <AppProvider>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </AppProvider>
  )
}
const UserLayout = ({ children }:any) => <>{children}</>
const AdminLay = ({ children }:any) => <AdminLayout>{children}</AdminLayout>
export default EvergreenApp;