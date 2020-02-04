import { useState, useEffect } from 'react'
import {
	Form,
	TextArea,
	Message,
	Header,
	Icon,
	Button
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import axios from 'axios'

import baseUrl from '../../utils/baseUrl'
import catchErrors from '../../utils/catchErrors'

const CreateCheckup = ({ pet }) => {
	const INITIAL_CHECKUP = {
		diagnostic: '',
		observations: '',
		medicines: ''
	}
	const [checkup, setCheckup] = useState(INITIAL_CHECKUP)
	const [disabled, setDisabled] = useState(false)
	const [success, setSuccess] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		const isCheckup = Object.values(checkup).every((element) =>
			Boolean(element)
		)
		isCheckup ? setDisabled(false) : setDisabled(true)
	}, [checkup])

	const handleChange = (e) => {
		const { name, value } = e.target
		setCheckup((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	const handleSubmit = async () => {
		try {
			setLoading(true)
			const url = `${baseUrl}/api/checkup`
			const token = cookie.get('token')
			const headers = {
				headers: { Authorization: token }
			}
			const payload = { ...checkup, pet }
			const { data } = await axios.post(url, payload, headers)
			setSuccess(true)
		} catch (error) {
			console.error(error)
			catchErrors(error, setError)
		} finally {
			setLoading(false)
		}
	}
	return (
		<>
			<Header as='h2' block>
				<Icon name='add' color='orange' />
				Create New Checkup
			</Header>
			<Form
				loading={loading}
				error={Boolean(error)}
				onSubmit={handleSubmit}
				success={success}
			>
				<Message
					success
					icon='check'
					header='Success!'
					content='Your CheckUp has been created.'
				/>
				<Message error header='Oops!' content={error} />
				<Form.Field
					control={TextArea}
					name='diagnostic'
					label='Diagnostic'
					placeholder='Diagnostic'
					type='text'
					onChange={handleChange}
					value={checkup.diagnostic}
				/>
				<Form.Field
					control={TextArea}
					name='observations'
					label='Observations'
					placeholder='Observations'
					type='text'
					onChange={handleChange}
					value={checkup.observations}
				/>
				<Form.Field
					control={TextArea}
					name='medicines'
					label='Medicines'
					placeholder='Medicines'
					type='text'
					onChange={handleChange}
					value={checkup.medicines}
				/>
				<Form.Field
					control={Button}
					color='blue'
					icon='pencil alternate'
					content='Submit'
					type='submit'
					disabled={disabled || loading}
				/>
			</Form>
		</>
	)
}

const mapStateToProps = ({ pet: { pet } }) => ({
	pet
})

export default connect(mapStateToProps, {})(CreateCheckup)
