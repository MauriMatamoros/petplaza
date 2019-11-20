import {
	SET_PET,
	START_UPDATE_PET,
	UPDATE_PET,
	PET_ERROR,
	SET_PET_PROFILE_PICTURE,
	SET_RECORD,
	ADD_VACCINE,
	REMOVE_VACCINE,
	START_REMOVE_VACCINE,
	ADD_ALLERGY,
	ADD_DISEASE,
	REMOVE_ALLERGY,
	REMOVE_DISEASE,
	START_REMOVE_ALLERGY,
	START_REMOVE_DISEASE
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
	loadingAllergies: false,
	loadingDiseases: false,
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
		case START_REMOVE_ALLERGY:
			return {
				...state,
				loadingAllergies: true,
				error: null
			}
		case START_REMOVE_DISEASE:
			return {
				...state,
				loadingDiseases: true,
				error: null
			}
		case REMOVE_VACCINE:
			return {
				...state,
				vaccines: state.vaccines.filter(({ _id }) => _id !== payload),
				loadingVaccines: false
			}
		case REMOVE_ALLERGY:
			return {
				...state,
				allergies: state.allergies.filter(({ _id }) => _id !== payload),
				loadingAllergies: false
			}
		case REMOVE_DISEASE:
			return {
				...state,
				diseases: state.diseases.filter(({ _id }) => _id !== payload),
				loadingDiseases: false
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
		case ADD_ALLERGY:
			return {
				...state,
				allergies: [...state.allergies, payload]
			}
		case ADD_DISEASE:
			return {
				...state,
				diseases: [...state.diseases, payload]
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
