import { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Input, Button, Image, Message } from 'semantic-ui-react'
import cookie from 'js-cookie'
import { connect } from 'react-redux'

import baseUrl from '../../utils/baseUrl'
import catchErrors from '../../utils/catchErrors'
import { setProfilePicture } from '../../redux/actions/profile'

const Uploader = () => {
	const INITIAL_MEDIA = ''
	const [media, setMedia] = useState(INITIAL_MEDIA)
	const [mediaPreview, setMediaPreview] = useState('')
	const [success, setSuccess] = useState(false)
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		media ? setDisabled(false) : setDisabled(true)
	}, [media])

	const handleChange = (e) => {
		const { files } = e.target
		setMedia({ media: files[0] })
		setMediaPreview(window.URL.createObjectURL(files[0]))
	}
	//refactor image upload to the server
	const handleImageUpload = async () => {
		const data = new FormData()
		data.append('file', media)
		data.append('upload_preset', 'reactreserve')
		data.append('cloud_name', 'mmatamoros')
		const {
			data: { url: mediaUrl }
		} = await axios.post(process.env.CLOUDINARY_URL, data)
		console.log(mediaUrl)
		return mediaUrl
	}

	const handleSubmit = async (e) => {
		try {
			e.preventDefault()
			setLoading(true)
			setError('')
			const mediaUrl = await handleImageUpload()
			const token = cookie.get('token')
			const url = `${baseUrl}/api/account/profilePicture`
			const headers = {
				headers: { Authorization: token }
			}
			const payload = { profilePicture: mediaUrl }
			const { data } = await axios.put(url, payload, headers)
			setProfilePicture(data)
			setMedia(INITIAL_MEDIA)
			setSuccess(true)
		} catch (error) {
			catchErrors(error, setError)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
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
					content='Your profile picture has been posted.'
				/>
				<Message error header='Oops!' content={error} />
				<Form.Group widths='equal'>
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
				<Image src={mediaPreview} rounded centered size='small' />
				<Form.Field
					control={Button}
					primary
					icon='pencil alternate'
					content='Update Profile Picture'
					type='submit'
					disabled={disabled || loading}
				/>
			</Form>
		</>
	)
}

export default connect(
	null,
	{ setProfilePicture }
)(Uploader)
