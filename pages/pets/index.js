import { useRouter } from 'next/router'
import { Button } from 'semantic-ui-react'
import { parseCookies } from 'nookies'
import axios from 'axios'

import baseUrl from '../../utils/baseUrl'
import PetList from '../../components/Pet/PetList'

const Pets = ({ pets }) => {
	const router = useRouter()
	return (
		console.log(pets) || (
			<>
				<PetList pets={pets} />
				<Button
					circular
					icon='add'
					floated='right'
					size='huge'
					onClick={() => router.push('/addPet')}
				/>
			</>
		)
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
