import { useState } from 'react'
import axios from 'axios'
import { Button, Header, Modal } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'

import baseUrl from '../../utils/baseUrl'

const ProductAttributes = ({ _id, description, user }) => {
	const [modal, setModal] = useState(false)
	const isRoot = user && user.role === 'root'
	const isAdmin = user && user.role === 'admin'
	const isRootOrAdmin = isRoot || isAdmin

	const router = useRouter()
	const handleDelete = async () => {
		const url = `${baseUrl}/api/product/${_id}`
		const token = cookie.get('token')
		const payload = {
			headers: { Authorization: token }
		}
		await axios.delete(url, payload)
		router.push('/')
	}
	return (
		<>
			<Header as='h3'>About this product</Header>
			<p>{description}</p>
			{isRootOrAdmin && (
				<>
					<Button
						icon='trash alternate outline'
						color='red'
						content='Delete Product'
						onClick={() => setModal(true)}
					/>
					<Modal open={modal} dimmer='blurring'>
						<Modal.Header>Confirm Delete</Modal.Header>
						<Modal.Content>
							<p>Are you sure you want to delete this product?</p>
						</Modal.Content>
						<Modal.Actions>
							<Button content='Cancel' onClick={() => setModal(false)} />
							<Button
								negative
								icon='trash'
								labelPosition='right'
								content='Delete'
								onClick={handleDelete}
							/>
						</Modal.Actions>
					</Modal>
				</>
			)}
		</>
	)
}

export default ProductAttributes
