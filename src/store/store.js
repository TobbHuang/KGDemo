import {
  getAllCompanies,
  getAllLinks,
  getNodesSurroundingCompany,
  getLinksSurroundingCompany,
  getCompanyWeight,
  getCompanyInfo,
  getCompanyInfoById,
  getSubGraphById
} from '@/api/api'

const graphData = {
  state: {
    nodes: null,
    links: null,
    subGraphNodes: null,
    subGraphLinks: null,
    companyWeight: null,
    companyInfo: {
    }
  },

  mutations: {
    SET_NODES: (state, nodes) => {
      state.nodes = nodes
    },
    SET_LINKS: (state, links) => {
      state.links = links
    },
    SET_SUB_GRAPH_NODES: (state, nodes) => {
      state.subGraphNodes = nodes
    },
    SET_SUB_GRAPH_LINKS: (state, links) => {
      state.subGraphLinks = links
    },
    SET_COMPANY_WEIGHT: (state, companyWeight) => {
      state.companyWeight = companyWeight
    },
    SET_COMPANY_INFO: (state, companyInfo) => {
      state.companyInfo = companyInfo
    }
  },
  actions: {

    GetAllLinks ({commit}, links) {
      return new Promise((resolve, reject) => {
        getAllLinks().then(response => {
          let linkData = response.data.obj
          const companyLinks = []
          for (let l of linkData) {
            let link = {}
            link['source'] = l.partyAName
            link['target'] = l.partyBName
            link['value'] = Number(l.linkWeight)
            companyLinks.push(link)
          }
          commit('SET_LINKS', companyLinks)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    GetAllCompanies ({commit}, nodes) {
      return new Promise((resolve, reject) => {
        getAllCompanies().then(response => {
          let companyData = response.data.obj
          const nodes = []
          for (let co of companyData) {
            let node = {}
            node['name'] = co.companyName
            node['draggable'] = 'true'
            node['symbolSize'] = 10
            node['value'] = co.capital
            node['id'] = co.id
            if (co.core === 1) {
              node['category'] = 1
            } else {
              node['category'] = 0
            }
            nodes.push(node)
          }
          commit('SET_NODES', nodes)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    GetNodesSurroundingCompany ({commit}, companyName) {
      return new Promise((resolve, reject) => {
        getNodesSurroundingCompany(companyName).then(response => {
          let companyData = response.data.obj
          const nodes = []
          for (let co of companyData) {
            let node = {}
            node['name'] = co.companyName
            node['draggable'] = 'true'
            node['symbolSize'] = 30
            node['value'] = co.capital
            if (co.core === 1) {
              node['category'] = 1
            } else {
              node['category'] = 0
            }
            nodes.push(node)
          }
          commit('SET_SUB_GRAPH_NODES', nodes)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    GetLinksSurroundingCompany ({commit}, companyName) {
      return new Promise((resolve, reject) => {
        getLinksSurroundingCompany(companyName).then(response => {
          let linkData = response.data.obj
          const companyLinks = []
          for (let l of linkData) {
            let link = {}
            link['source'] = l.partyAName
            link['target'] = l.partyBName
            link['value'] = Number(l.linkWeight)
            companyLinks.push(link)
          }
          commit('SET_SUB_GRAPH_LINKS', companyLinks)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    GetCompanyWeight ({commit}, companyName) {
      return new Promise((resolve, reject) => {
        getCompanyWeight(companyName).then(response => {
          commit('SET_COMPANY_WEIGHT', response.data.obj)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    GetCompanyInfo ({commit}, companyName) {
      return new Promise((resolve, reject) => {
        getCompanyInfo(companyName).then(response => {
          commit('SET_COMPANY_INFO', response.data.obj)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    GetCompanyInfoById ({commit}, id) {
      return new Promise((resolve, reject) => {
        getCompanyInfoById(id).then(response => {
          commit('SET_COMPANY_INFO', response.data.obj)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    GetSubGraphById ({commit}, p) {
      return new Promise((resolve, reject) => {
        console.log(p)
        // console.log(p.)
        getSubGraphById(p.id, p.depth).then(response => {
          commit('SET_SUB_GRAPH_NODES', response.data.obj.nodes)
          commit('SET_SUB_GRAPH_LINKS', response.data.obj.links)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}

export default graphData
