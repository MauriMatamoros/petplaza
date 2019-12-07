import { connect } from 'react-redux'
import { Segment, Header, Button } from 'semantic-ui-react'
import cookie from 'js-cookie'

import { removeAllergy } from '../../redux/actions/pet'

const Allergies = ({
	role,
	petId,
	allergies,
	loadingAllergies,
	removeAllergy
}) => {
	const isRoot = role === 'root'
	const isDoctor = role === 'doctor'
	const isRootOrDoctor = isRoot || isDoctor
	const token = cookie.get('token')
	const mapAllergies = (allergies) =>
		allergies.map(({ _id, name }) => (
			<Segment.Group key={_id} horizontal>
				<Segment textAlign='center' basic>
					{name}
				</Segment>
				{isRootOrDoctor && (
					<Segment textAlign='center' basic>
						<Button
							negative
							icon='delete'
							onClick={() => removeAllergy(petId, _id, token)}
						></Button>
					</Segment>
				)}
			</Segment.Group>
		))
	return (
		<>
			{allergies && (
				<Segment basic loading={loadingAllergies}>
					{' '}
					<Header>Allergies</Header>
					{mapAllergies(allergies)}
				</Segment>
			)}
		</>
	)
}

const mapStateToProps = ({ pet: { allergies, loadingAllergies } }) => ({
	allergies,
	loadingAllergies
})

export default connect(mapStateToProps, { removeAllergy })(Allergies)
