import axios from 'axios'

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API as string,
    timeout: 35000,
})

service.interceptors.request.use(config => {
    return new Promise((resolve) => {
        resolve(config)
    })
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(
    (response) => {
        const { data } = response
        return data
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default service
