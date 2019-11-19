import { GET_PATIENTS } from '../actions/types'

const initialState = {
	patients: [],
	loading: false,
	loadingForm: false,
	error: null,
	success: false
}

export default (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case GET_PATIENTS:
			return {
				...state,
				...payload,
				error: null,
				loading: false
			}
		default:
			return state
	}
}
