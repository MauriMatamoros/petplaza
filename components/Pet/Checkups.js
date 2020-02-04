import { useEffect } from 'react'
import {
	Header,
	Accordion,
	Label,
	Segment,
	Icon,
	Button,
	List,
	Image,
	Pagination,
	Container
} from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import cookie from 'js-cookie'

import formatDate from '../../utils/formatDate'
import { changePage, defaultState } from '../../redux/actions/checkup'

const Checkups = ({
	checkups,
	totalPages,
	changePage,
	loading,
	defaultState,
	pet
}) => {
	useEffect(() => {
		return () => defaultState()
	}, [])
	const router = useRouter()
	const mapOrdersToPanels = (orders) => {
		return checkups.map((checkup) => ({
			key: checkup._id,
			title: {
				content: <Label color='blue' content={formatDate(checkup.createdAt)} />
			},
			content: {
				content: (
					<>
						<List.Header as='h3'>{checkup.diagnostic}</List.Header>
						<List>
							<Button
								onClick={() => router.push(`/checkup/${checkup._id}`)}
								primary
							>
								View CheckUp
							</Button>
						</List>
					</>
				)
			}
		}))
	}

	return (
		<>
			<Header as='h2'>
				<Icon name='folder open' />
				Checkup History
			</Header>
			{checkups.length === 0 ? (
				<Segment inverted tertiary color='grey' textAlign='center'>
					<Header icon>
						<Icon name='copy outline' />
						No past CheckUps.
					</Header>
				</Segment>
			) : (
				<>
					<Segment basic loading={loading}>
						<Accordion
							fluid
							styled
							exclusive={false}
							panels={mapOrdersToPanels(checkups)}
						/>
					</Segment>
					<Container textAlign='center' style={{ margin: '2em' }}>
						<Pagination
							defaultActivePage={1}
							totalPages={totalPages}
							onPageChange={(e, data) => {
								const token = cookie.get('token')
								const page = data.activePage
								changePage({ token, page, _id: pet })
							}}
						/>
					</Container>
				</>
			)}
		</>
	)
}

const mapStateToProps = ({
	checkup: { checkups, totalPages, loading },
	pet: { pet }
}) => ({
	checkups,
	totalPages,
	loading,
	pet
})

export default connect(mapStateToProps, { changePage, defaultState })(Checkups)
