import { types } from 'mobx-state-tree'

const AlertStore = types.model('Alert', {
  message: types.string,
  type: types.enumeration('AlertType', [
    'alert-success',
    'alert-warning',
    'alert-error'
  ])
})

export default AlertStore
