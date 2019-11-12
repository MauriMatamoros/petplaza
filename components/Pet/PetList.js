import Link from 'next/link'
import { Card } from 'semantic-ui-react'

const PetList = ({ pets }) => {
	const mapPetsToItems = (pets) => {
		return pets.map(({ _id, name }) => (
			<Link key={_id} href={`/pets/${_id}`}>
				<Card fluid color='teal'>
					<Card.Content>
						<Card.Meta>{name}</Card.Meta>
					</Card.Content>
				</Card>
			</Link>
		))
	}
	return pets ? (
		<Card.Group stackable itemsPerRow='3' centered>
			{mapPetsToItems(pets)}
		</Card.Group>
	) : (
		<div>Add Pets</div>
	)
}

export default PetList
