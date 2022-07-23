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
  login: async (payload: any) => {
    try {
      const res: any = await api.post('/auth/login', payload);
      return res.data;
    } catch (err: any) {
      throw new Error(err.response);
    }
  },
  verifyOtp: async (payload: any) => {
    try {
      const res: any = await api.post('/auth/otp', payload);
      return res.data;
    } catch (err: any) {
      throw new Error(handleErrors(err));
    }
  },
};

export default userService;
