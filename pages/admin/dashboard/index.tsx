import React from 'react'
import Navbar from './Navbar'

export default function AdminDashboard() {

    const [state, setState] = React.useState<string>()
    return (
        <div className="row">
            <div className="col-md-12">
                <Navbar />
            </div>
            <div className="col-md-3 bg-success">
                <div className="card">
                    <div className="card-header">
                        Admin Dashboard
                    </div>
                    <div className="card-body">
                        <ul className="list list-group">
                            <li className="list-group-item" > Products</li>
                            {state === "products" ? (<ul className="list list-group">
                                <li className="list-group-item"> Add new </li>
                                <li className="list-group-item"> All Products </li>
                            </ul>) : (<></>)}

                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-9 bg-success"></div>

        </div>
    )
}
