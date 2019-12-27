import { types } from 'mobx-state-tree'
import PostStore from './postStore'
import UserStore from './userStore'
import AlertStore from './alertStore'
import { PostService } from '../_services/post.services'
import { UserService } from '../_services/user.services'

const RootStore = types
  .model('Post', {
    Posts: types.maybeNull(types.array(PostStore)),
    IsUpdate: false,
    PostEditModel: types.maybeNull(PostStore),
    LoginUser: types.maybeNull(UserStore),
    LoggingIn: false,
    LoggedIn: false,
    RegisterUserExist: false,
    AlertState: types.maybeNull(AlertStore)
  })
  .actions(seft => ({
    setPostsData (data) {
      seft.Posts = data
    },
    setPostEditModel (data) {
      seft.PostEditModel = data
    },
    setLoggingIn (status) {
      seft.LoggingIn = status
    },
    setLoggedIn (statue) {
      seft.LoggedIn = statue
    },
    setRegisterUserExist (status) {
      seft.RegisterUserExist = status
    },
    async setAlertState (alertState) {
      seft.AlertState = alertState
      setTimeout(() => {
        this.setAlertState(null)
      }, 5000)
    },
    async getAllPost () {
      const { error, data } = await PostService.getAllPost()
      if (error && error.length > 0) {
      } else {
        this.setPostsData(data)
      }
    },
    async createPost (title, description) {
      const { error, data } = await PostService.createPost(title, description)
      if (error && error.length > 0) {
      } else {
        this.setPostsData(data)
      }
    },
    async getPostEditModelById (id) {
      const { error, data } = await PostService.getPostById(id)
      if (error && error.length > 0) {
      } else {
        this.setPostEditModel(data)
      }
    },
    setUserloged (user) {
      seft.LoginUser = user
    },
    async login (username, password) {
      this.setLoggingIn(true)
      const data = await UserService.login(username, password)
      this.setLoggingIn(false)
      if (data.ok) {
        this.setUserloged(data)
        window.localStorage.setItem('user', JSON.stringify(data))
        this.setLoggedIn(true)
      } else {
      }
    },
    async checkLoggedIn () {
      this.setLoggedIn(false)
      const userStr = window.localStorage.getItem('user')
      if (userStr) {
        const { token } = JSON.parse(userStr)
        const { isLogged } = await UserService.checkLoggedIn(token)
        if (isLogged) {
          this.setLoggedIn(true)
        }
      }
    },
    logout () {
      this.setLoggedIn(false)
      window.localStorage.removeItem('user')
    },
    async register (user) {
      const resp = await UserService.register(user)
      if (resp && resp.error && resp.error.length > 0) {
        this.setAlertState({
          message: 'Register failure, try again later.',
          type: 'alert-error'
        })
      } else {
        this.setAlertState({
          message: 'Register success.',
          type: 'alert-success'
        })
      }
    },
    async userExist (username) {
      const exist = await UserService.userExist(username)
      this.setRegisterUserExist(exist)
    },
    formIsUpdate (status) {
      seft.IsUpdate = status
    }
  }))

export default RootStore
