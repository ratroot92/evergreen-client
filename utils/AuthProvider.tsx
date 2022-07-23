/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React from 'react';
import userService from '../services/auth.service';
import ReactLoading from 'react-loading';
import dataServer from '../services/axios.config';

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
  // user: IUser;
  // setUser: any;
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

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await dataServer.get(`/auth/isAuthenticated`);
        console.log('response', response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div>
      {loading ? (
        <ReactLoading color="#000" />
      ) : (
        <AuthContext.Provider
          value={{
            // user,
            isAuthenticated,
            setIsAuthenticated,
            // setUser,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default AuthProvider;
