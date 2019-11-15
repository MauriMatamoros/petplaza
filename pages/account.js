import { useEffect } from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { connect } from 'react-redux'

import AccountHeader from '../components/Account/AccountHeader'
import AccountOrders from '../components/Account/AccountOrders'
import AccountPermissions from '../components/Account/AccountPermissions'
import AccountInformation from '../components/Account/AccountInformation'
import ChangePassword from '../components/Account/ChangePassword'
import DoctorInformation from '../components/Account/DoctorInformation'
import Uploader from '../components/Account/Uploader'
import Spinner from '../components/Spinner/Spinner'
import baseUrl from '../utils/baseUrl'
import { setProfile } from '../redux/actions/profile'
import { setInitialOrders } from '../redux/actions/order'

const Account = ({ user, setProfile, loading }) => {
	const isRoot = user.role === 'root'
	const isDoctor = user.role === 'doctor'
	const isRootOrDoctor = isRoot || isDoctor

	useEffect(() => {
		setProfile({ ...user })
	}, [setProfile])
	return !loading ? (
		<>
			<AccountHeader />
			<Uploader />
			<AccountInformation />
			<ChangePassword />
			{isRootOrDoctor && <DoctorInformation />}
			<AccountOrders />
			{isRoot && <AccountPermissions currentUserId={user._id} />}
		</>
	) : (
		<Spinner />
	)
}

Account.getInitialProps = async (ctx) => {
	const { token } = parseCookies(ctx)
	if (!token) {
		return { orders: [], pageNumber: 0 }
	}
	const {
		order: { pageSize }
	} = ctx.reduxStore.getState()
	const payload = {
		headers: { Authorization: token },
		params: { page: 1, size: pageSize }
	}
	const url = `${baseUrl}/api/orders`
	const { data } = await axios.get(url, payload)
	ctx.reduxStore.dispatch(setInitialOrders(data))
	return {}
}

const mapStateToProps = ({ profile: { loading } }) => ({
	loading
})

export default connect(
	mapStateToProps,
	{ setProfile, setInitialOrders }
)(Account)
