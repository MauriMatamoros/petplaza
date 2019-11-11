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

const Account = ({ user, orders, setProfile, loading }) => {
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
			<AccountOrders orders={orders} />
			{isRoot && <AccountPermissions currentUserId={user._id} />}
		</>
	) : (
		<Spinner />
	)
}

Account.getInitialProps = async (ctx) => {
	const { token } = parseCookies(ctx)
	// Check not necessary due to configurations in _app.js
	if (!token) {
		return { orders: [] }
	}
	const payload = { headers: { Authorization: token } }
	const url = `${baseUrl}/api/orders`
	const { data } = await axios.get(url, payload)
	return {
		orders: data
	}
}

const mapStateToProps = ({ profile: { loading } }) => ({
	loading
})

export default connect(
	mapStateToProps,
	{ setProfile }
)(Account)
