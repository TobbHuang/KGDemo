import request from '@/utils/request'

export function getAllLinks () {
  return request({
    url: '/graph/getAllLinks',
    method: 'get'
  })
}
export function getAllCompanies () {
  return request({
    url: '/company/all',
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
export function getCompanyInfoById (id) {
  return request({
    url: '/company/info?id=' + id,
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
export function getSubGraphById (id, depth) {
  return request({
    url: '/company/subgraph?id=' + id + '&depth=' + depth,
    method: 'get'
  })
}
export function getSubGraphByName (name, depth) {
  return request({
    url: '/company/subgraphByName?companyName=' + name + '&depth=' + depth,
    method: 'get'
  })
}
export function getSupplyChain () {
  return request({
    url: '/company/getSupplyChain',
    method: 'get'
  })
}
export function getContractsByCompanyName (nameA, nameB) {
  return request({
    url: '/contract/getByCompanyNames?companyNameA=' + nameA + '&companyNameB=' + nameB,
    method: 'get'
  })
}
