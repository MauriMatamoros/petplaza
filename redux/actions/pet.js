import axios from 'axios'

import {
	SET_PET,
	UPDATE_PET,
	START_UPDATE_PET,
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

export const setRecord = (record) => (dispatch) =>
	dispatch({ type: SET_RECORD, payload: record })

export const addVaccine = (vaccine) => (dispatch) =>
	dispatch({ type: ADD_VACCINE, payload: vaccine })

export const removeVaccine = (petId, vaccineId, token) => async (dispatch) => {
	try {
		dispatch({ type: START_REMOVE_VACCINE })
		const url = `${baseUrl}/api/pet/${petId}/vaccine/${vaccineId}`
		const payload = {
			headers: { Authorization: token }
		}
		const { data } = await axios.delete(url, payload)
		dispatch({
			type: REMOVE_VACCINE,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: PET_ERROR,
			payload: error.response.data
		})
	}
}

export const addAllergy = (allergy) => (dispatch) =>
	dispatch({ type: ADD_ALLERGY, payload: allergy })

export const removeAllergy = (petId, allergyId, token) => async (dispatch) => {
	try {
		dispatch({ type: START_REMOVE_ALLERGY })
		const url = `${baseUrl}/api/pet/${petId}/allergy/${allergyId}`
		const payload = {
			headers: { Authorization: token }
		}
		const { data } = await axios.delete(url, payload)
		dispatch({
			type: REMOVE_ALLERGY,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: PET_ERROR,
			payload: error.response.data
		})
	}
}

export const addDisease = (disease) => (dispatch) =>
	dispatch({ type: ADD_DISEASE, payload: disease })

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
