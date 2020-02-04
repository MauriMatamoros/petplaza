import axios from 'axios'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { Button } from 'semantic-ui-react'
import { parseCookies } from 'nookies'

import baseUrl from '../../utils/baseUrl'
import { setPet, setRecord } from '../../redux/actions/pet'
import PetForm from '../../components/Pet/PetForm'
import PetInformation from '../../components/Pet/PetInformation'
import Record from '../../components/Pet/Record'
import Checkups from '../../components/Pet/Checkups'
import { setInitialCheckups } from '../../redux/actions/checkup'

const Pet = ({ _id, owner, user }) => {
	const router = useRouter()
	const isOwner = owner === user._id
	const isRoot = user.role === 'root'
	const isDoctor = user.role === 'doctor'
	const isRootOrDoctor = isRoot || isDoctor
	return (
		<>
			{isOwner ? (
				<PetForm _id={_id} />
			) : (
				<>
					<PetInformation />
				</>
			)}
			<Checkups />
			{isRootOrDoctor && (
				<>
					<Button primary fluid onClick={() => router.push('/checkup')}>
						Create a Checkup
					</Button>
				</>
			)}
			<br />
			<Record role={user.role} _id={_id} />
		</>
	)
}

Pet.getInitialProps = async (ctx) => {
	const { token } = parseCookies(ctx)
	if (!token) {
		return { checkups: [], pageNumber: 0 }
	}
	const _id = ctx.query._id
	let url = `${baseUrl}/api/pet/${_id}`
	const {
		data: { pet, record }
	} = await axios.get(url)
	ctx.reduxStore.dispatch(setPet(pet))
	ctx.reduxStore.dispatch(setRecord(record))
	const {
		checkup: { pageSize }
	} = ctx.reduxStore.getState()
	const payload = {
		headers: { Authorization: token },
		params: { page: 1, size: pageSize }
	}
	url = `${baseUrl}/api/checkups/${_id}`
	const response = await axios.get(url, payload)
	ctx.reduxStore.dispatch(setInitialCheckups(response.data))
	return {
		_id,
		owner: pet.owner
	}
}

export default connect(null, {
	setPet,
	setRecord
})(Pet)
