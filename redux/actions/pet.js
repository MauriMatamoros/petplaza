import axios from 'axios'

import {
	SET_PET,
	UPDATE_PET,
	START_UPDATE_PET,
	PET_ERROR,
	SET_PET_PROFILE_PICTURE
} from './types'
import baseUrl from '../../utils/baseUrl'

export const setPetProfilePicture = (payload) => (dispatch) =>
	dispatch({
		type: SET_PET_PROFILE_PICTURE,
		payload
	})

export const setPet = (pet) => (dispatch) =>
	dispatch({
		type: SET_PET,
		payload: pet
	})

export const updatePet = (_id, pet, token) => async (dispatch) => {
	try {
		dispatch({
			type: START_UPDATE_PET
		})

		const url = `${baseUrl}/api/pet/${_id}`
		const headers = { headers: { Authorization: token } }
		const { data } = await axios.put(url, pet, headers)
		dispatch({
			type: UPDATE_PET,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: PET_ERROR,
			payload: error.response.data
		})
	}
}
