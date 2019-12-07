import { connect } from 'react-redux'
import { Segment, Header, Button } from 'semantic-ui-react'
import cookie from 'js-cookie'

import { removeDisease } from '../../redux/actions/pet'

const Diseases = ({
	role,
	petId,
	diseases,
	loadingDiseases,
	removeDisease
}) => {
	const isRoot = role === 'root'
	const isDoctor = role === 'doctor'
	const isRootOrDoctor = isRoot || isDoctor
	const token = cookie.get('token')
	const mapDiseases = (diseases) =>
		diseases.map(({ _id, name }) => (
			<Segment.Group key={_id} horizontal>
				<Segment textAlign='center' basic>
					{name}
				</Segment>
				{isRootOrDoctor && (
					<Segment textAlign='center' basic>
						<Button
							negative
							icon='delete'
							onClick={() => removeDisease(petId, _id, token)}
						></Button>
					</Segment>
				)}
			</Segment.Group>
		))
	return (
		<>
			{diseases && (
				<Segment basic loading={loadingDiseases}>
					{' '}
					<Header>Diseases</Header>
					{mapDiseases(diseases)}
				</Segment>
			)}
		</>
	)
}

const mapStateToProps = ({ pet: { diseases, loadingDiseases } }) => ({
	diseases,
	loadingDiseases
})

export default connect(mapStateToProps, { removeDisease })(Diseases)
