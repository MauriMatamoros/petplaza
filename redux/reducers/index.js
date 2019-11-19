import { combineReducers } from 'redux'

import profile from './profile'
import pet from './pet'
import order from './order'
import patient from './patient'

export default combineReducers({
	profile,
	pet,
	order,
	patient
})
