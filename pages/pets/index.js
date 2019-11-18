import { useRouter } from 'next/router'
import { Button, Segment, Header, Icon } from 'semantic-ui-react'
import { parseCookies } from 'nookies'
import axios from 'axios'

import baseUrl from '../../utils/baseUrl'
import PetList from '../../components/Pet/PetList'

const Pets = ({ pets }) => {
	const router = useRouter()
	return pets.length > 0 ? (
		<>
			<PetList pets={pets} />
			<Segment basic>
				<Button
					circular
					icon='add'
					floated='right'
					size='huge'
					onClick={() => router.push('/addPet')}
				/>
			</Segment>
		</>
	) : (
		<>
			<Segment placeholder>
				<Header icon>
					<Icon name='paw' />
					No pets are listed for this user.
				</Header>
				<Button primary onClick={() => router.push('/addPet')}>
					Add Pet
				</Button>
			</Segment>
		</>
	)
}

Pets.getInitialProps = async (ctx) => {
	const { token } = parseCookies(ctx)
	// Check not necessary due to configurations in _app.js
	if (!token) {
		return { pets: [] }
	}
	const payload = { headers: { Authorization: token } }
	const url = `${baseUrl}/api/pets`
	const { data } = await axios.get(url, payload)
	return {
		pets: data
	}
}

export default Pets
