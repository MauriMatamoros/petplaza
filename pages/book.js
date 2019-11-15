import { useState, useEffect } from 'react'
import { Button, Form, Select, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import { parseCookies } from 'nookies'

import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'
import { handleLogin } from '../utils/auth'

const Book = ({ doctors }) => {
	const INITIAL_USER = {
		name: '',
		email: '',
		password: '',
		id: '',
		birthday: new Date()
	}
	const BOOK_OPTIONS = [
		{ key: 'Grooming', value: 'Grooming', text: 'Grooming' },
		{ key: 'Medical', value: 'Medical', text: 'Medical' },
		{ key: 'Hotel', value: 'Hotel', text: 'Hotel' }
	]
	const [doctor, setDoctor] = useState('')
	const [type, setType] = useState('')
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

	const handleTypeChange = (e, { value }) => {
		setType(value)
	}

	const handleDoctorChange = (e, { value }) => {
		setDoctor(value)
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
				icon='calendar'
				header='Book a Date'
				content='Medical | Grooming | Hotel'
				color='teal'
			/>
			<Form error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
				<Message error header='Oops!' content={error} />
				<Segment>
					<div className='field'>
						<label>Book Type</label>
						<Select
							placeholder='Select Booking type...'
							options={BOOK_OPTIONS}
							onChange={handleTypeChange}
						/>
					</div>
					<Form.Group>
						{type === 'Medical' && (
							<div className='field'>
								<label>Doctor</label>
								<Select
									placeholder='Select a Doctor...'
									options={doctors.map((doctor) => ({
										key: doctor._id,
										value: doctor._id,
										text: doctor.name
									}))}
									onChange={handleDoctorChange}
								/>
							</div>
						)}
					</Form.Group>
					<div className='field'>
						<label>Date</label>
						<DatePicker
							selected={user.birthday}
							onChange={handleBirthdayChange}
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							dropdownMode='select'
							showTimeSelect
							timeFormat='p'
							timeIntervals={15}
							dateFormat='Pp'
						/>
					</div>
					<Button
						icon='signup'
						type='submit'
						primary
						content='Book'
						disabled={disabled || loading}
					/>
				</Segment>
			</Form>
		</>
	)
}

Book.getInitialProps = async (ctx) => {
	const { token } = parseCookies(ctx)
	const payload = { headers: { Authorization: token } }
	const url = `${baseUrl}/api/users/doctors`
	const { data } = await axios.get(url, payload)
	console.log(data)
	return {
		doctors: data
	}
}

export default Book
