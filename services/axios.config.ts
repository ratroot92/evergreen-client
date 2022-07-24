/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from 'axios'



const dataServer:any = axios.create({
  baseURL: 'http://0.0.0.0:8001/api',
  timeout: 100000000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

dataServer.interceptors.request.use(request => {
  console.log("%c interceptors.request start", 'color:orange;font-size:12px;')
  console.log(request.baseURL+request.url)
  const accessToken = localStorage.getItem("accessToken")
  if (accessToken !== "null" && accessToken !== null) {
    console.log("%c token atatched from localStorage", 'color:orange;font-size:12px;')
    console.log(accessToken)
    request.headers["accessToken"] = accessToken;


  }
  console.log("%c interceptors.request end",'color:orange;font-size:12px;')
  
  return request

},
  error => {
  return Promise.reject(error)
}
)

dataServer.interceptors.response.use(response => {
  console.log("%c interceptors.response start",'color:green;font-size:12px;')
  console.log(response.data.data)
  console.log(response.data.accessToken) 
  console.log("%c interceptors.response end",'color:green;font-size:12px;')
  localStorage.setItem("accessToken",response.data.accessToken)
return response

},
error => {
  if (error.response) {
     if (error.response.status === 401 ) {
       localStorage.clear()
    return Promise.reject({status:error.response.status,message:error.response.data.message})
       
     }
   else if (error.response.status === 422) {
    return Promise.reject({status:error.response.status,message:error.response.data.errors[0].message})
       
    }
     else {
    return Promise.reject({status:error.response.status,message:error.response.data.message})
       
  }
  }
  else {
    return Promise.reject(error)
  }
})
export default dataServer