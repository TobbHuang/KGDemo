import request from '@/utils/request'

export function getAllLinks () {
  return request({
    url: '/graph/getAllLinks',
    method: 'get'
  })
}
export function getAllCompanies () {
  return request({
    url: '/graph/getAllCompanies',
    method: 'get'
  })
}
export function getNodesSurroundingCompany (companyName) {
  return request({
    url: '/graph/getNodesSurroundingCompany?companyName=' + companyName,
    method: 'get'
  })
}
export function getLinksSurroundingCompany (companyName) {
  return request({
    url: '/graph/getLinksSurroundingCompany?companyName=' + companyName,
    method: 'get'
  })
}
export function getCompanyWeight (companyName) {
  return request({
    url: '/graph/getCompanyWeight?companyName=' + companyName,
    method: 'get'
  })
}
export function resetNodeWeight () {
  return request({
    url: '/graph/resetNodeWeight',
    method: 'get'
  })
}
export function getCompanyInfo (companyName) {
  return request({
    url: '/graph/showCompanyInfo?companyName=' + companyName,
    method: 'get'
  })
}
export function randomizeContract () {
  return request({
    url: '/contract/randomizeContract',
    method: 'post'
  })
}
export function getAllContracts () {
  return request({
    url: '/contract/getAllContracts',
    method: 'get'
  })
}
