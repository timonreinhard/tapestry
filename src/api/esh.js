import axios from 'axios'

const client = axios.create({
  baseURL: 'http://192.168.2.10:8080/rest'
})

client.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default {
  eventSource: null,

  subscribe (cb) {
    this.unsubcribe()
    this.eventSource = new window.EventSource(client.defaults.baseURL + '/events')
    cb = cb || function () {}
    this.eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data)
      cb(data)
    }
  },

  unsubcribe () {
    if (!this.eventSource) return
    this.eventSource.close()
  },

  getItems () {
    return client.get('/items')
  },

  getThings () {
    return client.get('/things')
  },

  getChannelTypes () {
    return client.get('/channel-types')
  }
}
