import { useRouter } from 'next/router'
import { Button } from 'semantic-ui-react'

const Pets = () => {
	const router = useRouter()
	return (
		<>
			<div>Pets List</div>
			<Button
				circular
				icon='add'
				floated='right'
				size='huge'
				onClick={() => router.push('/addPet')}
			/>
		</>
	)
}

export default Pets
