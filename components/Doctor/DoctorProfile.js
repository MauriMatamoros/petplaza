import { Segment, Grid, Image, Header, Icon } from 'semantic-ui-react'

const DoctorProfile = ({
	name,
	university,
	facebook,
	youtube,
	twitter,
	instagram,
	specialty,
	profilePicture
}) => (
	<Segment>
		<Grid columns={2}>
			<Grid.Row stretched>
				<Grid.Column>
					<Segment basic>
						{!profilePicture ? (
							<Icon name='user' />
						) : (
							<Image size='big' circular src={profilePicture} />
						)}
						<Header textAlign='center' as='h3'>
							{name}
						</Header>
					</Segment>
				</Grid.Column>
				<Grid.Column>
					<Segment.Group>
						<Segment basic>
							<Icon name='university' /> {university}
						</Segment>
						<Segment basic>
							<Icon name='doctor' /> {specialty}
						</Segment>
					</Segment.Group>
					<Segment>
						{facebook && (
							<a target='_blank' href={facebook}>
								<Icon name='facebook' color='blue' />
							</a>
						)}
						{youtube && (
							<a target='_blank' href={youtube}>
								<Icon name='youtube' color='red' />
							</a>
						)}
						{instagram && (
							<a target='_blank' href={instagram}>
								<Icon name='instagram' color='pink' />
							</a>
						)}
						{twitter && (
							<a target='_blank' href={twitter}>
								<Icon name='twitter' color='teal' />
							</a>
						)}
					</Segment>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</Segment>
)

export default DoctorProfile
