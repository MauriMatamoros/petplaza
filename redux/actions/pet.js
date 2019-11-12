import axios from 'axios'

import { SET_PET } from './types'

export const setPet = (pet) => (dispatch) =>
	dispatch({
		type: SET_PET,
		payload: pet
	})
