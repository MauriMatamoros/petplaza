import { Header, Icon, Segment, Image } from 'semantic-ui-react'

const UserHeader = ({ email, name, cellphone, id, profilePicture }) => {
	return (
		<Segment secondary inverted>
			{profilePicture && (
				<Image src={profilePicture} size='small' circular centered />
			)}
			<Header inverted textAlign='center' as='h1' icon>
				{!profilePicture && <Icon name='user' />}
				{name}
				<Header.Subheader>Email: {email}</Header.Subheader>
				<Header.Subheader>ID: {id}</Header.Subheader>
				<Header.Subheader>Cellphone: {cellphone} </Header.Subheader>
			</Header>
		</Segment>
	)
}

export default UserHeader
