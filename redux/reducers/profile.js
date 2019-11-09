import {
	SET_PROFILE,
	LOGOUT,
	UPDATE_PROFILE,
	START_UPDATE_PROFILE,
	PROFILE_ERROR,
	UPDATE_DOCTOR_PROFILE
} from '../actions/types'

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
	loading: true,
	loadingForm: false,
	error: null,
	success: false
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
		case START_UPDATE_PROFILE:
			return {
				...state,
				loadingForm: true,
				error: null,
				success: false
			}
		case UPDATE_DOCTOR_PROFILE:
		case UPDATE_PROFILE: {
			return {
				...state,
				...payload,
				loadingForm: false,
				error: null,
				success: true
			}
		}
		case PROFILE_ERROR: {
			return {
				...state,
				loadingForm: false,
				error: payload,
				success: false
			}
		}
		case LOGOUT:
			return {
				...initialState
			}
		default:
			return state
	}
}
