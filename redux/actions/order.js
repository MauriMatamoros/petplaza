import axios from 'axios'

import {
	SET_INITIAL_ORDERS,
	CHANGE_ORDERS_PAGE,
	DEFAULT_ORDER_SETTINGS,
	START_CHANGE_ORDERS_PAGE,
	ORDER_ERROR
} from './types'
import baseUrl from '../../utils/baseUrl'

export const setInitialOrders = (payload) => (dispatch) =>
	dispatch({
		type: SET_INITIAL_ORDERS,
		payload
	})

export const changePage = ({ token, page }) => async (dispatch, getState) => {
	try {
		const {
			order: { pageSize }
		} = getState()
		dispatch({
			type: START_CHANGE_ORDERS_PAGE
		})
		const payload = {
			headers: { Authorization: token },
			params: { page, size: pageSize }
		}
		const url = `${baseUrl}/api/orders`
		const { data } = await axios.get(url, payload)
		dispatch({
			type: CHANGE_ORDERS_PAGE,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: ORDER_ERROR,
			payload: error.response.data
		})
	}
}

export const defaultState = () => (dispatch) =>
	dispatch({
		type: DEFAULT_ORDER_SETTINGS
	})
