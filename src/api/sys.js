import request from '@/utils/request'

export function fetchCorpList(query) {
  return request({
    url: '/sys/queryCorp',
    method: 'get',
    params: query
  })
}

export function fetchUserList() {
  return request({
    url: '/sys/queryUser',
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/sys/addUser',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/sys/updateUser',
    method: 'post',
    data
  })
}

export function fetchRole() {
  return request({
    url: '/sys/role',
    method: 'get'
  })
}

export function fetchCorp() {
  return request({
    url: '/sys/corp',
    method: 'get'
  })
}

export function fetchArea() {
  return request({
    url: '/sys/area',
    method: 'get'
  })
}

export function fetchGroup() {
  return request({
    url: '/sys/group',
    method: 'get'
  })
}

export function fetchMenu() {
  return request({
    url: '/sys/sysmenu',
    method: 'get'
  })
}

export function fetchMenuByRole(data) {
  return request({
    url: '/sys/getMenuByRole',
    method: 'get',
    data
  })
}

export function createCorp(data) {
  return request({
    url: '/sys/addCorp',
    method: 'post',
    data
  })
}

export function updateCorp(data) {
  return request({
    url: '/sys/updateCorp',
    method: 'post',
    data
  })
}

