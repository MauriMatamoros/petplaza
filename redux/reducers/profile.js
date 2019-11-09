import { SET_PROFILE } from '../actions/types'

const initialState = {
	name: null,
	email: null,
	role: null,
	id: null,
	birthday: null,
	profilePicture: null,
	university: null,
	specialty: null,
	facebook: null,
	twitter: null,
	instagram: null,
	youtube: null,
	loading: true
}

export default (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case SET_PROFILE:
			return {
				...state,
				...payload,
				loading: false
			}
		default:
			return state
	}
}
