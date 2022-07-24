/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React from 'react';
import dataServer from '../services/axios.config';
import ReactLoader from '../components/Loader/ReactLoading';

interface IUser {
  // username: string;
  // password: string;
  // email: string;
  // role: string | number;
  [key: string]: any;
}
interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: any;
  logout: any;
  user: any;
  setUser: any;
}
export const AuthContext = React.createContext<AuthContextProps | null>(null) as React.Context<AuthContextProps>;
const AuthProvider = ({ children }) => {
  // const [user, setUser] = React.useState<IUser>({
  //   // username: '',
  //   // email: '',
  //   // password: '',
  //   // role: '',
  // });
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await dataServer.get(`/auth/isAuthenticated`);
        setIsAuthenticated(response.data.data.isAuthenticated);
      } catch (err: any) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.clear();
  };
  return (
    <div>
      {loading ? (
        <ReactLoader />
      ) : (
        <AuthContext.Provider
          value={{
            user,
            isAuthenticated,
            setIsAuthenticated,
            logout,
            setUser,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default AuthProvider;
