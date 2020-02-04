import {
	START_REMOVE_CHECKUP,
	REMOVE_CHECKUP,
	SET_CHECKUP,
	CHANGE_CHECKUP_PAGE,
	START_CHANGE_CHECKUP_PAGE,
	DEFAULT_CHECKUP_SETTINGS,
	SET_INITIAL_CHECKUPS
} from '../actions/types'

const initialState = {
	pageSize: 5,
	totalPages: 0,
	checkups: [],
	checkup: null,
	loading: true,
	loadingForm: false,
	error: null,
	success: false
}

export default (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case SET_CHECKUP:
			return {
				...state,
				checkup: payload
			}
		case SET_INITIAL_CHECKUPS:
			return {
				...state,
				...payload,
				error: null,
				loading: false
			}
		case START_CHANGE_CHECKUP_PAGE:
			return {
				...state,
				loading: true,
				error: null
			}
		case CHANGE_CHECKUP_PAGE:
			return {
				...state,
				...payload,
				loading: false,
				error: null
			}
		case CHANGE_CHECKUP_PAGE:
			return {
				...state,
				loadingForm: true,
				error: null
			}
		case DEFAULT_CHECKUP_SETTINGS: {
			return {
				...initialState
			}
		}
		default:
			return state
	}
}
