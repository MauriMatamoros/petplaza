import { useState, useEffect } from 'react'
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import axios from 'axios'
import DatePicker from 'react-datepicker'

import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'
import { handleLogin } from '../utils/auth'

const Signup = () => {
	const INITIAL_USER = {
		name: '',
		email: '',
		password: '',
		id: '',
		cellphone: '',
		birthday: new Date()
	}
	const [user, setUser] = useState(INITIAL_USER)
	const [disabled, setDisabled] = useState(true)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		const isUser = Object.values(user).every((element) => Boolean(element))
		isUser ? setDisabled(false) : setDisabled(true)
	}, [user])

	const handleChange = (e) => {
		const { name, value } = e.target
		setUser((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	const handleBirthdayChange = (date) => {
		setUser((prevState) => ({ ...prevState, birthday: date }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			setError('')
			const url = `${baseUrl}/api/signup`
			const payload = { ...user }
			const { data } = await axios.post(url, payload)
			handleLogin(data)
		} catch (error) {
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
				header='Get Started'
				content='Create a new account'
				color='teal'
			/>
			<Form error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
				<Message error header='Oops!' content={error} />
				<Segment>
					<Form.Input
						fluid
						icon='user'
						iconPosition='left'
						label='Name'
						placeholder='Name'
						name='name'
						onChange={handleChange}
						value={user.name}
						type='text'
					/>
					<Form.Input
						fluid
						icon='envelope'
						iconPosition='left'
						label='Email'
						placeholder='Email'
						name='email'
						onChange={handleChange}
						value={user.email}
						type='email'
					/>
					<Form.Input
						fluid
						icon='lock'
						iconPosition='left'
						label='Password'
						placeholder='Password'
						name='password'
						onChange={handleChange}
						value={user.password}
						type='password'
					/>
					<Form.Input
						fluid
						icon='address card'
						iconPosition='left'
						label='ID'
						placeholder='0801190012345'
						name='id'
						onChange={handleChange}
						value={user.id}
						type='text'
					/>
					<Form.Input
						fluid
						icon='call'
						iconPosition='left'
						label='Cellphone'
						placeholder='99999999'
						name='cellphone'
						onChange={handleChange}
						value={user.cellphone}
						type='text'
					/>
					<div className='field'>
						<label>Birthday</label>
						<DatePicker
							selected={user.birthday}
							onChange={handleBirthdayChange}
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							dropdownMode='select'
						/>
					</div>
					<Button
						icon='signup'
						type='submit'
						color='orange'
						content='Signup'
						disabled={disabled || loading}
					/>
				</Segment>
			</Form>
			<Message attached='bottom' warning>
				<Icon name='help' />
				Existing user?{' '}
				<Link href='/login'>
					<a>Log in here</a>
				</Link>{' '}
				instead
			</Message>
		</>
	)
}

export default Signup
