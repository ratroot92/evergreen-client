import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import ReactLoader from '../../../components/Loader/ReactLoading';
import dataServer from '../../../services/axios.config';

function AdminDashboard() {
  const [state, setState] = React.useState({
    allServices: [
      {
        name: 'user-microserice',
        localUrl: 'http://localhost:8002/api',
        seeders: [
          { name: 'role', url: '/role/seed' },
          { name: 'user', url: '/user/seed' },
        ],
      },
      {
        name: 'auth-microserice',
        localUrl: 'http://localhost:8001/api',
        seeders: {},
      },
    ],
    loading: false,
  });

  async function runSeeder(e: any, seedName: String) {
    try {
      setState({ ...state, loading: true });
      const service: any = state.allServices.filter(({ name }) => name === e.target.id)[0];
      if (service) {
        const selectedSeed = service.seeders?.filter(({ name }: any) => name === seedName)[0];
        if (selectedSeed) {
          const url = service.localUrl + selectedSeed.url;
          const response: any = await axios.get(url);
          toast(response.data.message);
        } else {
          toast(`Seed name '${selectedSeed.name}' not found.`);
        }
      } else {
        toast(`Service '${service}' not found.`);
      }
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
          <div className="row">
            {state.allServices?.map((service: any, index: Number) => (
              <div key={service.name + index} className="col-md-4">
                <div className="card">
                  <div className="card-header text-center">{service.name}</div>
                  <div className="card-body">
                    <p>Seeders</p>
                    <ul className="list list-inline">
                      {service.seeders.length &&
                        service.seeders.map((seed: any, index: Number) => {
                          return (
                            <li key={seed.name + index}>
                              <span>{seed.name}</span>
                              <span id={service.name} onClick={(e) => runSeeder(e, seed.name)} role="button" className="badge bg-success">
                                Run
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div className="card-footer"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

AdminDashboard.Layout = AdminLayout;
export default AdminDashboard;
