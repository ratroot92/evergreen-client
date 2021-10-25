import { api, handleErrors } from '../config/axios.config';

const validationService = {
  isAdminEmailValid: async (email: string) => {
    try {
      console.log(process.env);
      const res: any = await api.post('/users/validate', { email });
      return res.data;
    } catch (err: any) {
      throw new Error(handleErrors(err));
    }
  },
};

export default validationService;
