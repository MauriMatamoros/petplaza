import { useState, useEffect } from 'react'
import axios from 'axios'
import {
	Form,
	Input,
	TextArea,
	Button,
	Image,
	Message,
	Header,
	Icon
} from 'semantic-ui-react'
import cookie from 'js-cookie'

import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'

const CreateProduct = () => {
	const INITIAL_PRODUCT = {
		name: '',
		description: '',
		price: '',
		inStock: '',
		media: ''
	}
	const [product, setProduct] = useState(INITIAL_PRODUCT)
	const [mediaPreview, setMediaPreview] = useState('')
	const [success, setSuccess] = useState(false)
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const isProduct = Object.values(product).every((element) =>
			Boolean(element)
		)
		isProduct ? setDisabled(false) : setDisabled(true)
	}, [product])

	const handleChange = (e) => {
		const { name, value, files } = e.target
		if (name === 'media') {
			setProduct((prevState) => ({ ...prevState, media: files[0] }))
			setMediaPreview(window.URL.createObjectURL(files[0]))
		} else {
			setProduct((prevState) => ({
				...prevState,
				[name]: value
			}))
		}
	}
	//refactor image upload to the server
	const handleImageUpload = async () => {
		const data = new FormData()
		data.append('file', product.media)
		data.append('upload_preset', 'reactreserve')
		data.append('cloud_name', 'mmatamoros')
		const {
			data: { url: mediaUrl }
		} = await axios.post(process.env.CLOUDINARY_URL, data)
		return mediaUrl
	}

	const handleSubmit = async (e) => {
		try {
			e.preventDefault()
			setLoading(true)
			setError('')
			const mediaUrl = await handleImageUpload()
			const url = `${baseUrl}/api/product`
			const { name, price, description, inStock } = product
			const token = cookie.get('token')
			const headers = {
				headers: { Authorization: token }
			}
			const payload = { name, price, description, mediaUrl, inStock }
			const { data } = await axios.post(url, payload, headers)
			setProduct(INITIAL_PRODUCT)
			setSuccess(true)
		} catch (error) {
			catchErrors(error, setError)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Header as='h2' block>
				<Icon name='add' color='orange' />
				Create New Product
			</Header>
			<Form
				loading={loading}
				error={Boolean(error)}
				onSubmit={handleSubmit}
				success={success}
			>
				<Message
					success
					icon='check'
					header='Success!'
					content='Your product has been posted.'
				/>
				<Message error header='Oops!' content={error} />
				<Form.Group widths='equal'>
					<Form.Field
						control={Input}
						name='name'
						label='Name'
						placeholder='Name'
						type='text'
						onChange={handleChange}
						value={product.name}
					/>
					<Form.Field
						control={Input}
						name='price'
						label='Price'
						placeholder='Price'
						type='text'
						min='0.00'
						step='0.01'
						type='number'
						onChange={handleChange}
						value={product.price}
					/>
					<Form.Field
						control={Input}
						name='media'
						label='Media'
						content='Select Image'
						type='file'
						accept='image/*'
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Field
					control={Input}
					name='inStock'
					label='In Stock'
					placeholder='In Stock'
					type='text'
					min='0'
					step='1'
					type='number'
					onChange={handleChange}
					value={product.inStock}
				/>
				<Image src={mediaPreview} rounded centered size='small' />
				<Form.Field
					control={TextArea}
					name='description'
					label='Description'
					placeholder='Description'
					type='text'
					onChange={handleChange}
					value={product.description}
				/>
				<Form.Field
					control={Button}
					color='blue'
					icon='pencil alternate'
					content='Submit'
					type='submit'
					disabled={disabled || loading}
				/>
			</Form>
		</>
	)
}

export default CreateProduct
