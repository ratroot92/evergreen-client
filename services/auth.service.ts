import { api, handleErrors } from '../config/axios.config';

const userService = {
  isUserAuthenticated: async () => {
    try {
      const res: any = await api.get('/users/authenticated');
      return res.data;
    } catch (err: any) {
      throw new Error(handleErrors(err));
    }
  },
  login: async (credentials: any) => {
    try {
      const { username, password } = credentials;
      const res: any = await api.post('/users/login', { username, password });
      return res.data;
    } catch (err: any) {
      throw new Error(handleErrors(err));
    }
  },
};

export default userService;
