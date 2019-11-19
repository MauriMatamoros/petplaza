import { connect } from 'react-redux'
import { Segment, Header, Image } from 'semantic-ui-react'
import format from 'date-fns/format'

const PetInformation = ({
	name,
	gender,
	birthday,
	color,
	breed,
	profilePicture
}) => {
	return (
		<>
			{profilePicture && (
				<Image circular size='medium' centered src={profilePicture} />
			)}
			<Header as='h5' attached='top'>
				Name
			</Header>
			<Segment attached>{name}</Segment>
			<Header as='h5' attached>
				Color
			</Header>
			<Segment attached>{color}</Segment>
			<Header as='h5' attached>
				Breed
			</Header>
			<Segment attached>{breed}</Segment>
			<Header as='h5' attached>
				Gender
			</Header>
			<Segment attached>{gender}</Segment>
			<Header as='h5' attached>
				Birthday
			</Header>
			<Segment attached>{format(Date.parse(birthday), 'dd/MM/yyyy')}</Segment>
		</>
	)
}

const mapStateToProps = ({
	pet: { name, gender, birthday, color, breed, profilePicture }
}) => ({
	name,
	gender,
	birthday,
	color,
	breed,
	profilePicture
})

export default connect(mapStateToProps)(PetInformation)
