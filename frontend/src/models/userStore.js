import { types } from 'mobx-state-tree'

const UserStore = types.model('User', {
  ok: types.boolean,
  id: types.number,
  username: types.string,
  firstName: types.string,
  lastName: types.string,
  token: types.string
})

export default UserStore
