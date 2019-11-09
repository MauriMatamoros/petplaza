import { Header, Icon, Item, Message, Segment, Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'

const CartItemList = ({ user, products, handleRemoveFromCart, success }) => {
	const router = useRouter()

	const mapCartProductsToItems = (products) => {
		return products.map(
			({ quantity, product: { _id, name, mediaUrl, price } }) => ({
				childKey: _id,
				header: (
					<Item.Header as='a' onClick={() => router.push(`/product/${_id}`)}>
						{name}
					</Item.Header>
				),
				image: mediaUrl,
				meta: `${quantity} x $${price}`,
				fluid: 'true',
				extra: (
					<Button
						basic
						icon='remove'
						floated='right'
						onClick={() => handleRemoveFromCart(_id)}
					/>
				)
			})
		)
	}
	if (success) {
		return (
			<Message
				success
				header='Success!'
				content='Your order and payment has been accepted.'
				icon='star outline'
			/>
		)
	}
	if (products.length === 0) {
		return (
			<Segment secondary color='teal' inverted textAlign='center' placeholder>
				<Header icon>
					<Icon name='shopping basket' />
					No products in your cart. Add some!
				</Header>
				<div className=''>
					{user ? (
						<Button color='orange' onClick={() => router.push('/')}>
							View Products
						</Button>
					) : (
						<Button color='blue' onClick={() => router.push('/login')}>
							Login to Add Products
						</Button>
					)}
				</div>
			</Segment>
		)
	}

	return <Item.Group items={mapCartProductsToItems(products)} divided />
}

export default CartItemList
