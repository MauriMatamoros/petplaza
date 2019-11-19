import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Message, Header, Icon, Input } from 'semantic-ui-react'
import axios from 'axios'
import cookie from 'js-cookie'

import Spinner from '../components/Spinner/Spinner'
import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'
import UserHeader from '../components/Patient/UserHeader'
import PetList from '../components/Pet/PetList'

const Search = () => {
	const INITIAL_SEARCH = ''
	const [search, setSearch] = useState(INITIAL_SEARCH)
	const [patients, setPatients] = useState([])
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [disabled, setDisabled] = useState(true)
	const [user, setUser] = useState(null)
	const [error, setError] = useState('')

	useEffect(() => {
		search.length > 0 ? setDisabled(false) : setDisabled(true)
	}, [search])

	const handleChange = (e) => {
		const { value } = e.target
		setSearch(value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			setSuccess(false)
			setDisabled(true)
			setUser(null)
			setPatients([])
			const token = cookie.get('token')
			const payload = { headers: { Authorization: token } }
			const url = `${baseUrl}/api/patients/${search}`
			const {
				data: { user, pets }
			} = await axios.get(url, payload)
			setUser(user)
			setPatients(pets)
			setSearch('')
			setSuccess(true)
		} catch (error) {
			catchErrors(error, setError)
		} finally {
			setLoading(false)
		}
	}
	return (
		<>
			<Header as='h2' block>
				<Icon name='search' color='orange' />
				Search for patients
			</Header>
			<Form
				loading={loading}
				success={success}
				error={Boolean(error)}
				onSubmit={handleSubmit}
			>
				<Message success icon='check' header='Success!' />
				<Message error header='Oops!' content={error} />
				<Form.Group inline widths='equal'>
					<Form.Field
						control={Input}
						name='id'
						label='ID'
						placeholder='0801234567890'
						type='text'
						onChange={handleChange}
						value={search}
					/>
					<Form.Field
						control={Button}
						primary
						icon='search'
						content='Search User'
						type='submit'
						disabled={disabled || loading}
					/>
				</Form.Group>
			</Form>
			{user && <UserHeader {...user} />}
			{patients && <PetList pets={patients} />}
		</>
	)
}

export default connect()(Search)
