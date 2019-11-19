import {
	SET_PET,
	START_UPDATE_PET,
	UPDATE_PET,
	PET_ERROR,
	SET_PET_PROFILE_PICTURE,
	SET_RECORD,
	ADD_VACCINE,
	REMOVE_VACCINE,
	START_REMOVE_VACCINE
} from '../actions/types'

const initialState = {
	name: null,
	breed: null,
	color: null,
	id: null,
	birthday: null,
	color: null,
	profilePicture: null,
	vaccines: [],
	allergies: [],
	diseases: [],
	loadingVaccines: false,
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
		case START_REMOVE_VACCINE:
			return {
				...state,
				loadingVaccines: true,
				error: null
			}
		case REMOVE_VACCINE:
			return {
				...state,
				vaccines: state.vaccines.filter(({ _id }) => _id !== payload),
				loadingVaccines: false
			}
		case SET_RECORD:
			return {
				...state,
				...payload,
				success: false,
				error: null,
				loading: false
			}
		case ADD_VACCINE:
			return {
				...state,
				vaccines: [...state.vaccines, payload]
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
				success: false,
				loadingVaccines: false
			}
		}
		default:
			return state
	}
}
