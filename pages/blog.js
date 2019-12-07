import { useState, useEffect } from 'react'
import {
	Segment,
	Form,
	Header,
	Input,
	TextArea,
	Icon,
	Message,
	Button
} from 'semantic-ui-react'
import axios from 'axios'

const Blog = () => {
	const INITIAL_FAQ = {
		topic: '',
		description: ''
	}
	const [success, setSuccess] = useState(false)
	const [faq, setFaq] = useState(INITIAL_FAQ)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(true)
	return (
		<>
			<Header as='h2' block>
				<Icon name='add' color='orange' />
				Create New Topic
			</Header>
			<Form>
				<Message
					success
					icon='check'
					header='Success!'
					content='Your FAQ has been posted.'
				/>
				<Message error header='Oops!' />
				<Form.Field
					control={Input}
					name='topic'
					label='Topic'
					placeholder='Topic'
					type='text'
				/>
				<Form.Field
					control={TextArea}
					name='description'
					label='Description'
					placeholder='Description'
					type='text'
				/>
				<Form.Field
					control={Button}
					color='blue'
					icon='pencil alternate'
					content='Submit'
					type='submit'
				/>
			</Form>
		</>
	)
}

export default Blog
