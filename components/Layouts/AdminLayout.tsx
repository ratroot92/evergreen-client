import React from 'react';
import AdminSidebar from '../Sidebar/AdminSidebar';

export default function AdminLayout({children}:any) {
    return(<div className="container-fluid">
    <div className="row ">
        <div className="col-xs-4 col-sm-4 col-md-3 col-lg-3 col-xl-3  m-0 p-0 ">
                <AdminSidebar/>  
        </div>
        <div className="col-xs-8 col-sm-8 col-md-9 col-lg-9 col-xl-9  border border border-success">
            {children}
         </div>
        </div>
        </div>)
}
