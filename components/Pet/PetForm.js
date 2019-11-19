import { useState, useEffect } from 'react'
import { Form, Input, Button, Message, Header, Icon } from 'semantic-ui-react'
import cookie from 'js-cookie'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'

import Uploader from '../General/Uploader'
import { setPetProfilePicture, updatePet } from '../../redux/actions/pet'

const Pet = ({
	_id,
	name,
	gender,
	birthday,
	color,
	breed,
	loading,
	success,
	error,
	setPetProfilePicture,
	updatePet
}) => {
	const INITIAL_PET = {
		name,
		gender,
		birthday,
		color,
		breed
	}
	const [pet, setPet] = useState(INITIAL_PET)
	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		const isPet = Object.values(pet).every((element) => Boolean(element))
		isPet ? setDisabled(false) : setDisabled(true)
	}, [pet])

	const handleChange = (e) => {
		const { name, value } = e.target
		setPet((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	const handleBirthdayChange = (date) => {
		setPet((prevState) => ({ ...prevState, birthday: date }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const token = cookie.get('token')
		const { name, gender, birthday, color, breed } = pet
		updatePet(_id, { name, gender, birthday, color, breed }, token)
	}

	return (
		<>
			<Header as='h2' block>
				<Icon name='add' color='orange' />
				Edit Pet
			</Header>
			<Form
				loading={loading}
				error={Boolean(error)}
				onSubmit={handleSubmit}
				success={success}
				style={{ marginBottom: '2em' }}
			>
				<Message
					success
					icon='check'
					header='Success!'
					content='Your pet has been updated.'
				/>
				<Message error header='Oops!' content={error} />
				<Form.Group widths='equal'>
					<Form.Field
						control={Input}
						name='name'
						label='Name'
						placeholder='Name'
						type='text'
						onChange={handleChange}
						value={pet.name}
					/>
					<Form.Field
						control={Input}
						name='color'
						label='Color'
						placeholder='Color'
						type='text'
						onChange={handleChange}
						value={pet.color}
					/>
					<Form.Field
						control={Input}
						name='breed'
						label='Breed'
						placeholder='Breed'
						type='text'
						onChange={handleChange}
						value={pet.breed}
					/>
				</Form.Group>
				<Form.Group>
					<div className='field'>
						<label>Birthday</label>
						<DatePicker
							selected={Date.parse(pet.birthday)}
							onChange={handleBirthdayChange}
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							dropdownMode='select'
						/>
					</div>
				</Form.Group>
				<Form.Group inline>
					<Form.Input
						fluid
						type='radio'
						label='Male'
						name='gender'
						value='male'
						checked={pet.gender === 'male'}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						type='radio'
						label='Female'
						name='gender'
						value='female'
						checked={pet.gender === 'female'}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Field
					control={Button}
					color='blue'
					icon='pencil alternate'
					content='Edit'
					type='submit'
					disabled={disabled || loading}
				/>
			</Form>
			<br />
			<Uploader
				routeUrl={`api/pet/profilePicture/${_id}`}
				setProfilePicture={setPetProfilePicture}
			/>
			<br />
		</>
	)
}

const mapStateToProps = ({
	pet: { name, color, breed, gender, birthday, loadingForm, success, error }
}) => ({
	name,
	color,
	breed,
	gender,
	birthday,
	loading: loadingForm,
	success,
	error
})

export default connect(mapStateToProps, {
	setPetProfilePicture,
	updatePet
})(Pet)
