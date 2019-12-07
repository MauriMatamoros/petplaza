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

const CreateCheckup = ({ loading, error, success }) => {
	const INITIAL_CHECKUP = {
		diagnostic: '',
		observations: '',
		medicines: ''
	}
	const [checkup, setCheckup] = useState(INITIAL_CHECKUP)
	const [disabled, setDisabled] = useState(false)

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

	const handleSubmit = () => {}
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
					content='Your product has been posted.'
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

const mapStateToProps = ({ checkup: { loadingForm, error, success } }) => ({
	loading: loadingForm,
	error,
	success
})

export default connect(mapStateToProps, {})(CreateCheckup)
