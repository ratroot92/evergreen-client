/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from 'axios'



const dataServer:any = axios.create({
  baseURL: 'http://0.0.0.0:8001/api',
  timeout: 100000000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

dataServer.interceptors.request.use(request => {
  console.log("%c**** -- interceptors.request start -- ****", 'color:red;font-weight:bold;font-size:12px;')
  console.log("%crequest.URL",'color:red;font-weight:bold')
  console.log(request.baseURL+request.url)
  const accessToken = localStorage.getItem("accessToken")
  if (accessToken !== "null") {
    request.headers["accessToken"] = accessToken;


  }
  console.log("%c**** -- interceptors.request end -- ****",'color:red;font-weight:bold;font-size:12px;')
  
  return request

},
  error => {
  return Promise.reject(error)
}
)

dataServer.interceptors.response.use(response => {
  console.log("%c**** -- interceptors.response start -- ****",'color:green;font-weight:bold;font-size:12px;')
  console.log("%cresponse.data.data",'color:green;font-weight:bold')
  console.log(response.data.data)
  console.log("%cresponse.data.accessToken",'color:green;font-weight:bold')
  console.log(response.data.accessToken) 
  console.log("%c**** -- interceptors.response end -- ****",'color:green;font-weight:bold;font-size:12px;')
  localStorage.setItem("accessToken",response.data.accessToken)
return response

},
error => {
  if (error.response) {
     if (error.response.status === 401 ) {
      localStorage.setItem("accessToken", JSON.stringify(null))
    }
    return Promise.reject({status:error.response.status,message:error.response.data.message})
  
  }
  else {
    return Promise.reject(error)
  }
})
export default dataServer