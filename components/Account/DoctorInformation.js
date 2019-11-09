import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Message, Segment, Button } from 'semantic-ui-react'
import cookie from 'js-cookie'

import { updateDoctorProfile } from '../../redux/actions/profile'

const DoctorInformation = ({
	university,
	specialty,
	facebook,
	twitter,
	instagram,
	youtube,
	success,
	error,
	loading,
	updateDoctorProfile
}) => {
	const INITIAL_USER = {
		university,
		specialty,
		facebook,
		twitter,
		instagram,
		youtube
	}
	const [user, setUser] = useState(INITIAL_USER)

	const handleChange = (e) => {
		const { name, value } = e.target
		setUser((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const token = cookie.get('token')
		updateDoctorProfile(user, token)
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
					icon='university'
					iconPosition='left'
					label='University'
					placeholder='University'
					name='university'
					onChange={handleChange}
					value={user.university || ''}
					type='text'
				/>
				<Form.Input
					fluid
					icon='user md'
					iconPosition='left'
					label='Specialty'
					placeholder='Specialty'
					name='specialty'
					onChange={handleChange}
					value={user.specialty || ''}
					type='text'
				/>
				<Form.Input
					fluid
					icon='facebook'
					iconPosition='left'
					label='Facebook'
					placeholder='Facebook'
					name='facebook'
					onChange={handleChange}
					value={user.facebook || ''}
					type='text'
				/>
				<Form.Input
					fluid
					icon='twitter'
					iconPosition='left'
					label='Twitter'
					placeholder='Twitter'
					name='twitter'
					onChange={handleChange}
					value={user.twitter || ''}
					type='text'
				/>
				<Form.Input
					fluid
					icon='youtube'
					iconPosition='left'
					label='YouTube'
					placeholder='YouTube'
					name='youtube'
					onChange={handleChange}
					value={user.youtube || ''}
					type='text'
				/>
				<Form.Input
					fluid
					icon='instagram'
					iconPosition='left'
					label='Instagram'
					placeholder='Instagram'
					name='instagram'
					onChange={handleChange}
					value={user.instagram || ''}
					type='text'
				/>
				<Button
					icon='signup'
					type='submit'
					primary
					content='Update'
					disabled={loading}
				/>
			</Segment>
		</Form>
	)
}

const mapStateToProps = ({
	profile: {
		university,
		specialty,
		facebook,
		twitter,
		instagram,
		youtube,
		loadingForm,
		success,
		error
	}
}) => ({
	university,
	specialty,
	facebook,
	twitter,
	instagram,
	youtube,
	success,
	error,
	loading: loadingForm
})

export default connect(
	mapStateToProps,
	{ updateDoctorProfile }
)(DoctorInformation)
