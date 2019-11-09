import { useState, useEffect } from 'react'
import { Form, Message, Segment, Button } from 'semantic-ui-react'
import cookie from 'js-cookie'
import axios from 'axios'

import baseUrl from '../../utils/baseUrl'
import catchErrors from '../../utils/catchErrors'

const ChangePassword = () => {
	const INITIAL_STATE = {
		newPassword: '',
		confirmPassword: '',
		currentPassword: ''
	}
	const [state, setState] = useState(INITIAL_STATE)
	const [disabled, setDisabled] = useState(true)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		const isState = Object.values(state).every((element) => Boolean(element))
		isState && state.newPassword === state.confirmPassword
			? setDisabled(false)
			: setDisabled(true)
	}, [state])

	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			setError('')
			setSuccess(false)
			const token = cookie.get('token')
			const url = `${baseUrl}/api/account/changePassword`
			const headers = { headers: { Authorization: token } }
			const payload = {
				newPassword: state.newPassword,
				currentPassword: state.currentPassword
			}
			await axios.put(url, payload, headers)
			setSuccess(true)
		} catch (error) {
			catchErrors(error, setError)
		} finally {
			setLoading(false)
		}
	}
	return (
		<Form
			error={Boolean(error)}
			onSubmit={handleSubmit}
			loading={loading}
			success={success}
		>
			<Message error header='Oops!' content={error} />
			<Message
				success
				header='Success'
				content='Password was successfully updated'
			/>
			<Segment>
				<Form.Input
					fluid
					icon='lock'
					iconPosition='left'
					label='Current Password'
					placeholder='Current Password'
					name='currentPassword'
					onChange={handleChange}
					value={state.currentPassword}
					type='password'
				/>
				<Form.Input
					fluid
					icon='lock'
					iconPosition='left'
					label='New Password'
					placeholder='New Password'
					name='newPassword'
					onChange={handleChange}
					value={state.newPassword}
					type='password'
				/>
				<Form.Input
					fluid
					icon='lock'
					iconPosition='left'
					label='Confirm Password'
					placeholder='Confirm Password'
					name='confirmPassword'
					onChange={handleChange}
					value={state.confirmPassword}
					type='password'
				/>
				<Button
					icon='signup'
					type='submit'
					primary
					content='Update Password'
					disabled={disabled || loading}
				/>
			</Segment>
		</Form>
	)
}

export default ChangePassword
