import { combineReducers } from 'redux'

import profile from './profile'
import pet from './pet'
import order from './order'
import checkup from './checkup'

export default combineReducers({
	profile,
	pet,
	order,
	checkup
})
