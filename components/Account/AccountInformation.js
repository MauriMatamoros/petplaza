import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Message, Segment, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import cookie from 'js-cookie'

import { updateProfile } from '../../redux/actions/profile'

const AccountInformation = ({
	name,
	email,
	id,
	birthday,
	cellphone,
	loading,
	success,
	error,
	updateProfile
}) => {
	const INITIAL_USER = {
		name,
		email,
		id,
		birthday,
		cellphone
	}
	const [user, setUser] = useState(INITIAL_USER)
	const [disabled, setDisabled] = useState(true)

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
		const token = cookie.get('token')
		updateProfile(user, token)
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
				content='Profile updated successfully.'
			/>
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
						selected={Date.parse(user.birthday)}
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
					primary
					content='Update'
					disabled={disabled || loading}
				/>
			</Segment>
		</Form>
	)
}

const mapStateToProps = ({
	profile: { name, email, id, birthday, cellphone, loadingForm, success, error }
}) => ({
	name,
	email,
	id,
	birthday,
	success,
	cellphone,
	error,
	loading: loadingForm
})

export default connect(mapStateToProps, { updateProfile })(AccountInformation)
