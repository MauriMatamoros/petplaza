import axios from 'axios'

import {
	START_REMOVE_CHECKUP,
	REMOVE_CHECKUP,
	CHANGE_CHECKUP_PAGE,
	START_CHANGE_CHECKUP_PAGE,
	DEFAULT_CHECKUP_SETTINGS,
	SET_INITIAL_CHECKUPS,
	CHECKUP_ERROR,
	SET_CHECKUP
} from './types'
import baseUrl from '../../utils/baseUrl'

export const setCheckUp = (payload) => (dispatch) => {
	try {
		dispatch({
			type: SET_CHECKUP,
			payload
		})
	} catch (error) {
		dispatch({
			type: CHECKUP_ERROR,
			payload: error.response.data
		})
	}
}

export const setInitialCheckups = (payload) => (dispatch) =>
	dispatch({
		type: SET_INITIAL_CHECKUPS,
		payload
	})

export const changePage = ({ token, page, _id }) => async (
	dispatch,
	getState
) => {
	try {
		const {
			order: { pageSize }
		} = getState()
		dispatch({
			type: START_CHANGE_CHECKUP_PAGE
		})
		const payload = {
			headers: { Authorization: token },
			params: { page, size: pageSize }
		}
		const url = `${baseUrl}/api/checkups/${_id}`
		const { data } = await axios.get(url, payload)
		dispatch({
			type: CHANGE_CHECKUP_PAGE,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: CHECKUP_ERROR,
			payload: error.response.data
		})
	}
}

export const defaultState = () => (dispatch) =>
	dispatch({
		type: DEFAULT_CHECKUP_SETTINGS
	})
