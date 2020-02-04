import { useState } from 'react'
import { parseCookies } from 'nookies'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Header, Segment, Button, Message } from 'semantic-ui-react'

import baseUrl from '../../utils/baseUrl'
import { redirectUser } from '../../utils/auth'

const Checkup = ({ checkup, user }) => {
	const isRootOrDoctor = user.role === 'root' || user.role === 'doctor'
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()
	const handleDelete = async () => {
		try {
			setLoading(true)
			const url = `${baseUrl}/api/checkups/${checkup._id}`
			const token = cookie.get('token')
			const payload = {
				headers: { Authorization: token }
			}
			await axios.delete(url, payload)
			setSuccess(true)
			setTimeout(() => {
				router.push(`/pets/${checkup.pet._id}`)
			}, 5000)
		} catch (error) {
			setError(error.message)
			setLoading(false)
		}
	}
	return !checkup ? (
		<>
			<Message error header='Oops' list={['Wrong id.']} />
		</>
	) : (
		<>
			{' '}
			{success && (
				<Message success header='Check Up Deleted' list={['Rerouting...']} />
			)}
			{error && (
				<Message
					error
					header='Oops! Something went wrong'
					list={['Try again later.']}
				/>
			)}
			<Segment>
				<Header as='h1'>{checkup.pet.name}'s Check Up</Header>
			</Segment>
			<Header as='h5' attached='top'>
				Diagnostic
			</Header>
			<Segment attached>{checkup.diagnostic}</Segment>
			<Header as='h5' attached>
				Observations
			</Header>
			<Segment attached>{checkup.observations}</Segment>
			<Header as='h5' attached>
				Medicines
			</Header>
			<Segment attached>{checkup.medicines}</Segment>
			<br />
			<br />
			{isRootOrDoctor && (
				<Button
					negative
					icon='trash'
					labelPosition='right'
					content='Delete'
					onClick={handleDelete}
					fluid
					loading={loading}
				/>
			)}
		</>
	)
}

Checkup.getInitialProps = async (ctx) => {
	const { token } = parseCookies(ctx)
	if (!token) {
		redirectUser(ctx, '/')
		return {}
	}
	const payload = {
		headers: {
			Authorization: token
		}
	}
	const url = `${baseUrl}/api/checkup/${ctx.query._id}`
	const {
		data: { checkup }
	} = await axios.get(url, payload)
	return {
		checkup
	}
}

export default Checkup
