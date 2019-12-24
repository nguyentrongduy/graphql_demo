import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { post, formStatus } from './post.reducer'
import { alert } from './alert.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  post,
  formStatus,
  alert
})

export default rootReducer
