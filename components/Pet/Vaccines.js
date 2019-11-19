import { connect } from 'react-redux'
import { Segment, Header, Button } from 'semantic-ui-react'
import format from 'date-fns/format'
import cookie from 'js-cookie'

import { removeVaccine } from '../../redux/actions/pet'

const Vaccines = ({
	role,
	petId,
	vaccines,
	loadingVaccines,
	removeVaccine
}) => {
	const token = cookie.get('token')
	const mapVaccines = (vaccines) =>
		vaccines.map(({ _id, name, date }) => (
			<Segment.Group key={_id} horizontal>
				<Segment textAlign='center' basic>
					{name}
				</Segment>
				<Segment textAlign='center' basic>
					{format(Date.parse(date), 'dd/MM/yyyy')}
				</Segment>
				{role === 'doctor' ||
					(role === 'root' && (
						<Segment textAlign='center' basic>
							<Button
								negative
								icon='delete'
								onClick={() => removeVaccine(petId, _id, token)}
							></Button>
						</Segment>
					))}
			</Segment.Group>
		))
	return (
		<>
			{vaccines && (
				<Segment basic loading={loadingVaccines}>
					{' '}
					<Header>Vaccines</Header>
					{mapVaccines(vaccines)}
				</Segment>
			)}
		</>
	)
}

const mapStateToProps = ({ pet: { vaccines, loadingVaccines } }) => ({
	vaccines,
	loadingVaccines
})

export default connect(mapStateToProps, { removeVaccine })(Vaccines)
