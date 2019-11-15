import { combineReducers } from 'redux'

import profile from './profile'
import pet from './pet'
import order from './order'

export default combineReducers({
	profile,
	pet,
	order
})
