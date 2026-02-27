// src/utils/request.js
import axios from 'axios'
import { ElMessage } from 'element-plus' // 可选：提示框，需安装 element-plus

// 创建 Axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 后端接口基础路径（从环境变量读取）
  timeout: 100000, // 请求超时时间（100秒）
  headers: {
    'Content-Type': 'application/json;charset=utf-8' // 默认请求头
  }
})

// 请求拦截器：添加 token、处理请求前逻辑
service.interceptors.request.use(
  (config) => {
    // 示例：添加登录 token（根据后端要求调整）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 请求错误处理
    console.error('请求拦截器错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器：统一处理响应、错误提示
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 假设后端返回格式：{ code: 200, data: {}, msg: '成功' }
    if (res.code !== 200) {
      ElMessage({
        message: res.msg || '请求失败',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(res.msg || '请求失败'))
    } else {
      return res // 成功时直接返回数据体
    }
  },
  (error) => {
    // 网络错误/服务器错误处理
    console.error('响应拦截器错误：', error)
    ElMessage({
      message: error.message || '服务器异常，请稍后重试',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

// 导出封装后的 Axios 实例
export default service