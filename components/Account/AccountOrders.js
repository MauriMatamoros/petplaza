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
import { changePage, defaultState } from '../../redux/actions/order'

const AccountOrders = ({
	orders,
	totalPages,
	changePage,
	loading,
	defaultState
}) => {
	useEffect(() => {
		return () => defaultState()
	}, [])
	const router = useRouter()
	const mapOrdersToPanels = (orders) => {
		return orders.map((order) => ({
			key: order._id,
			title: {
				content: <Label color='blue' content={formatDate(order.createdAt)} />
			},
			content: {
				content: (
					<>
						<List.Header as='h3'>
							Total: ${order.total}
							<Label
								content={order.email}
								icon='mail'
								basic
								horizontal
								style={{ marginLeft: '1em' }}
							/>
						</List.Header>
						<List>
							{order.products.map(
								({ product: { mediaUrl, name, price, _id }, quantity }) => (
									<List.Item key={_id}>
										<Image avatar src={mediaUrl} />
										<List.Content>
											<List.Header>{name}</List.Header>
											<List.Description>
												{quantity} · ${price}
											</List.Description>
										</List.Content>
										<List.Content floated='right'></List.Content>
									</List.Item>
								)
							)}
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
				Order History
			</Header>
			{orders.length === 0 ? (
				<Segment inverted tertiary color='grey' textAlign='center'>
					<Header icon>
						<Icon name='copy outline' />
						No past orders.
					</Header>
					<div>
						<Button onClick={() => router.push('/')} primary>
							View Products
						</Button>
					</div>
				</Segment>
			) : (
				<>
					<Segment basic loading={loading}>
						<Accordion
							fluid
							styled
							exclusive={false}
							panels={mapOrdersToPanels(orders)}
						/>
					</Segment>
					<Container textAlign='center' style={{ margin: '2em' }}>
						<Pagination
							defaultActivePage={1}
							totalPages={totalPages}
							onPageChange={(e, data) => {
								const token = cookie.get('token')
								const page = data.activePage
								changePage({ token, page })
							}}
						/>
					</Container>
				</>
			)}
		</>
	)
}

const mapStateToProps = ({ order: { orders, totalPages, loading } }) => ({
	orders,
	totalPages,
	loading
})

export default connect(
	mapStateToProps,
	{ changePage, defaultState }
)(AccountOrders)
