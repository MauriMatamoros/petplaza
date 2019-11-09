import { Header, Icon, Segment, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

import formatDate from '../../utils/formatDate'

const AccountHeader = ({ role, email, name, createdAt, id }) => {
	return (
		<Segment secondary inverted>
			<Label
				size='large'
				ribbon
				icon='privacy'
				style={{ textTransform: 'capitalize' }}
				content={role}
			/>
			<Header inverted textAlign='center' as='h1' icon>
				<Icon name='user' />
				{name}
				<Header.Subheader>Email: {email}</Header.Subheader>
				<Header.Subheader>ID: {id}</Header.Subheader>
				<Header.Subheader>Joined {formatDate(createdAt)}</Header.Subheader>
			</Header>
		</Segment>
	)
}

const mapStateToProps = ({
	profile: { role, name, email, createdAt, id }
}) => ({
	role,
	name,
	email,
	createdAt,
	id
})

export default connect(mapStateToProps)(AccountHeader)
