import { SET_PROFILE } from './types'

export const setProfile = (user) => (dispatch) =>
	dispatch({
		type: SET_PROFILE,
		payload: user
	})
