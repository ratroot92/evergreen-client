/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React from 'react';
import userService from '../services/auth.service';
import ReactLoading from 'react-loading';

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
  user: IUser;
  setUser: any;
}
export const AuthContext = React.createContext<AuthContextProps | null>(
  null
) as React.Context<AuthContextProps>;
const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState<IUser>({
    // username: '',
    // email: '',
    // password: '',
    // role: '',
  });
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    userService
      .isUserAuthenticated()
      .then((response: any) => {
        console.log(response);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <ReactLoading color="#000" />
      ) : (
        <AuthContext.Provider
          value={{
            user,
            isAuthenticated,
            setIsAuthenticated,
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
