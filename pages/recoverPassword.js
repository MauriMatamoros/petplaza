import { useState, useEffect } from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'

const RecoverPassword = () => {
	const [email, setEmail] = useState('')
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(true)

	const handleChange = (e) => {
		const { value } = e.target
		setEmail(value)
	}

	useEffect(() => {
		email.length > 0 ? setDisabled(false) : setDisabled(true)
	}, [email])

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setSuccess(false)
			setError('')
			setLoading(true)
			const url = `${baseUrl}/api/account/recoverPassword`
			const payload = { email }
			await axios.post(url, payload)
			setSuccess(true)
		} catch (error) {
			console.log(error)
			catchErrors(error, setError)
		} finally {
			setLoading(false)
		}
	}
	return (
		<>
			<Message
				attached
				icon='settings'
				header='Reset Password'
				content='Input your email'
				color='teal'
			/>
			<Form
				error={Boolean(error)}
				onSubmit={handleSubmit}
				loading={loading}
				success={success}
			>
				<Message error header='Oops!' content={error} />
				<Message success header='Success!' content='Email has been sent' />
				<Segment>
					<Form.Input
						fluid
						icon='envelope'
						iconPosition='left'
						label='Email'
						placeholder='Email'
						name='email'
						onChange={handleChange}
						value={email}
						type='email'
					/>
					<Button
						icon='signup'
						type='submit'
						primary
						content='Reset'
						disabled={disabled || loading}
					/>
				</Segment>
			</Form>
		</>
	)
}

export default RecoverPassword
