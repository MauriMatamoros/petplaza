import {
	SET_INITIAL_ORDERS,
	DEFAULT_ORDER_SETTINGS,
	START_CHANGE_ORDERS_PAGE,
	CHANGE_ORDERS_PAGE
} from '../actions/types'

const initialState = {
	pageSize: 5,
	totalPages: 0,
	orders: [],
	loading: true,
	loadingForm: false,
	error: null
}

export default (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case SET_INITIAL_ORDERS:
			return {
				...state,
				...payload,
				error: null,
				loading: false
			}
		case START_CHANGE_ORDERS_PAGE:
			return {
				...state,
				loading: true,
				error: null
			}
		case CHANGE_ORDERS_PAGE:
			return {
				...state,
				...payload,
				loading: false,
				error: null
			}
		case CHANGE_ORDERS_PAGE:
			return {
				...state,
				loadingForm: true,
				error: null
			}
		case DEFAULT_ORDER_SETTINGS: {
			return {
				...initialState
			}
		}
		default:
			return state
	}
}
