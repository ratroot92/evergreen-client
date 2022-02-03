/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from 'axios'

const dataServer:any = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 100000000,
//   headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

export default dataServer