import {
	SET_PET,
	START_UPDATE_PET,
	UPDATE_PET,
	PET_ERROR,
	SET_PET_PROFILE_PICTURE
} from '../actions/types'

const initialState = {
	name: null,
	breed: null,
	color: null,
	id: null,
	birthday: null,
	color: null,
	profilePicture: null,
	loading: true,
	loadingForm: false,
	error: null,
	success: false
}

export default (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case SET_PET:
			return {
				...state,
				...payload,
				success: false,
				error: null,
				loading: false
			}
		case START_UPDATE_PET:
			return {
				...state,
				loadingForm: true,
				error: null,
				success: false
			}
		case UPDATE_PET: {
			return {
				...state,
				...payload,
				loadingForm: false,
				error: null,
				success: true
			}
		}
		case SET_PET_PROFILE_PICTURE: {
			return {
				...state,
				profilePicture: payload
			}
		}
		case PET_ERROR: {
			return {
				...state,
				loadingForm: false,
				error: payload,
				success: false
			}
		}
		default:
			return state
	}
}
