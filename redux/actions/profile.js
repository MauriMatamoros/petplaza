import axios from 'axios'

import {
	SET_PROFILE,
	LOGOUT,
	UPDATE_PROFILE,
	PROFILE_ERROR,
	START_UPDATE_PROFILE,
	UPDATE_DOCTOR_PROFILE
} from './types'
import baseUrl from '../../utils/baseUrl'

export const setProfile = (user) => (dispatch) =>
	dispatch({
		type: SET_PROFILE,
		payload: user
	})

export const logout = () => (dispatch) => dispatch({ type: LOGOUT })

export const updateProfile = (user, token) => async (dispatch) => {
	try {
		dispatch({ type: START_UPDATE_PROFILE })
		const url = `${baseUrl}/api/account`
		const payload = { ...user }
		const headers = { headers: { Authorization: token } }
		const { data } = await axios.put(url, payload, headers)
		dispatch({ type: UPDATE_PROFILE, payload: data })
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: error.response.data
		})
	}
}

export const updateDoctorProfile = (user, token) => async (dispatch) => {
	try {
		dispatch({ type: START_UPDATE_PROFILE })
		const url = `${baseUrl}/api/account/doctor`
		const payload = { ...user }
		const headers = { headers: { Authorization: token } }
		const { data } = await axios.put(url, payload, headers)
		dispatch({ type: UPDATE_DOCTOR_PROFILE, payload: data })
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: error.response.data
		})
	}
}
