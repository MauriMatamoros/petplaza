import axios from 'axios'
import { connect } from 'react-redux'

import baseUrl from '../../utils/baseUrl'
import { setPet } from '../../redux/actions/pet'
import PetForm from '../../components/Pet/PetForm'
import PetInformation from '../../components/Pet/PetInformation'

const Pet = ({ _id, owner, user }) => {
	const isOwner = owner === user._id
	return <>{isOwner ? <PetForm _id={_id} /> : <PetInformation />}</>
}

Pet.getInitialProps = async ({ reduxStore: { dispatch }, query: { _id } }) => {
	const url = `${baseUrl}/api/pet/${_id}`
	const { data } = await axios.get(url)
	dispatch(setPet(data))
	return {
		_id,
		owner: data.owner
	}
}

export default connect(null, {
	setPet
})(Pet)
