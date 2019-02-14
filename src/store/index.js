import Vue from 'vue'
import Vuex from 'vuex'
import graphData from './store'
// import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    graphData
  }
  // ,
  // getters
})

export default store
