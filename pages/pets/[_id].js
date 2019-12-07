import axios from 'axios'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { Button } from 'semantic-ui-react'

import baseUrl from '../../utils/baseUrl'
import { setPet, setRecord } from '../../redux/actions/pet'
import PetForm from '../../components/Pet/PetForm'
import PetInformation from '../../components/Pet/PetInformation'
import Record from '../../components/Pet/Record'

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

Pet.getInitialProps = async ({ reduxStore: { dispatch }, query: { _id } }) => {
	const url = `${baseUrl}/api/pet/${_id}`
	const {
		data: { pet, record }
	} = await axios.get(url)
	dispatch(setPet(pet))
	dispatch(setRecord(record))
	return {
		_id,
		owner: pet.owner
	}
}

export default connect(null, {
	setPet,
	setRecord
})(Pet)
