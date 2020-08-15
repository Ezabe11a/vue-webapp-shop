import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8090/api/v1', 
    timeout: 7000,
    headers: {}
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
    // 加token
    config.headers.Authorization = localStorage.getItem('token') || ''
    
    return config
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截器：
instance.interceptors.response.use(function (response) {
    if (response.status === 200) {
        if (response.data && response.data.msg) {
            return response.data.data
        } else {
            alert('网络异常，请求稍后再试')
        }
        
    }
}, function (error) {
    return Promise.reject(error)
})

export default instance
