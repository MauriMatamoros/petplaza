import {
	CREATE_CHECKUP,
	UPDATE_CHECKUP,
	CHECKUP_ERROR,
	START_UPDATE_CHECKUP,
	REMOVE_CHECKUP
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
		case CREATE_CHECKUP:
			return {}
		default:
			return state
	}
}
