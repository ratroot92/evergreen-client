import axios from 'axios';
// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL,
  timeout: 100000000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});
// const handleErrors = (err: any): any => {
//   if (err.response) {
//     console.log(
//       '%c*********************************',
//       'font-size:12px;color:red;font-weight:bold'
//     );
//     console.log('Problem With Response => ', err.response);
//     console.log(
//       '%c*********************************',
//       'font-size:12px;color:red;font-weight:bold'
//     );
//     const e: any = new Error();
//     e.status = err.response.status;
//     e.message = err.response.data;
//     throw e;
//   }
//   if (err.request) {
//     console.log(
//       '%c*********************************',
//       'font-size:12px;color:red;font-weight:bold'
//     );
//     console.log('Problem With Request => ', err.request);
//     console.log(
//       '%c*********************************',
//       'font-size:12px;color:red;font-weight:bold'
//     );
//     const e: any = new Error(err.request.status.Text);
//     e.status = err.request.status;
//     throw e;
//     // console.log("Problem with request => ", err.request);
//     // return err.request.status.Text;
//   }
// };
export { api };
