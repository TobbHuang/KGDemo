import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8398'
})

export default service
