import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5'
const SIGN_KEY = 'BF7dg}bC95ZJ56gbscbsjcH6Fn]rBsrg9D7I6I'

const instance = axios.create({
  baseURL: 'http://47.244.6.191:5623/'
})

function signData(data) {
  const newArr = []
  for (let k in data) {
    newArr.push(`${k}=${data[k]}`)
  }
  newArr.sort()
  const newData = newArr.join('&') + `&signKey=${SIGN_KEY}`
  return qs.stringify(data) + `&signValue=${md5(newData)}`
}

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.data = signData(config.data || {})

  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response.data
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export function get(url, params, options = {}) {
  return instance({
    method: 'get',
    url,
    params,
    ...options
  })
}

export function post(url, data, options = {}) {
  return instance({
    method: 'post',
    url,
    data,
    ...options
  })
}
