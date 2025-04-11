import request from '@/utils/request'

// 向后端发送登录请求
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    // url: 'login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
