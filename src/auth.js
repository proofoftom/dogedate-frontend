import Router from './router'
import { Toast, LocalStorage, SessionStorage, Loading } from 'quasar'
import axios from 'axios'

const LOGIN_URL = 'authenticate'
const SIGNUP_URL = 'register'
const USER_URL = 'authenticate/user'
const REFRESH_TOKEN = 'refresh-token'

export default {

  user: {
    authenticated: false
  },

  login (creds, redirect) {
    axios.post(LOGIN_URL, creds)
      .then((response) => {
        SessionStorage.set('id_token', response.data.token)

        this.user.authenticated = true
        axios.defaults.headers.common.Authorization = 'Bearer : ' + SessionStorage.get.item('id_token')
        this.getAuthUser(redirect)
      })
      .catch((error) => {
        Toast.create.negative(error.response.data.message)
      })
  },

  signup (creds, redirect) {
    axios.post(SIGNUP_URL, creds)
      .then((response) => {
        SessionStorage.set('id_token', response.data.token)

        this.user.authenticated = true
        axios.defaults.headers.common.Authorization = 'Bearer : ' + SessionStorage.get.item('id_token')
        this.getAuthUser(redirect)
      })
      .catch((error) => {
        Toast.create.negative(error.response.data.message)
      })
  },

  logout () {
    SessionStorage.clear()
    this.user.authenticated = false
    Router.replace('/')
    Toast.create.positive('You\'ve been logged out successfully.')
  },

  checkAuth () {
    let jwt = SessionStorage.get.item('id_token')

    if (jwt) {
      this.user.authenticated = true
      axios.defaults.headers.common.Authorization = 'Bearer : ' + SessionStorage.get.item('id_token')
      this.refreshToken()
    }
    else {
      this.user.authenticated = false
    }
  },

  refreshToken () {
    var that = this

    axios.post(REFRESH_TOKEN)
      .then((response) => {
        // Store refreshed token
        axios.defaults.headers.common.Authorization = 'Bearer : ' + response.data.token
        SessionStorage.set('id_token', response.data.token)
        Toast.create.positive('You have successfully logged in.')
        that.getAuthUser()
      }, () => {
        Toast.create.negative('Something went wrong with your login!!')
        that.logout()
      })
  },

  getAuthUser (redirect = null) {
    axios.get(USER_URL)
      .then((response) => {
        LocalStorage.set('owner', response.data)

        if (redirect) {
          setTimeout(() => Router.replace(redirect), 700)
        }
      }, () => {
        Toast.create.negative('Something went wrong!')
      })
  },

  showLoading () {
    Loading.show({
      message: 'You got disconnected for security reasons.\n Reconnecting....'
    })
    setTimeout(() => {
      Loading.hide()
    }, 2000)
  }
}
