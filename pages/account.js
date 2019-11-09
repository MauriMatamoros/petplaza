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
import baseUrl from '../utils/baseUrl'
import { setProfile } from '../redux/actions/profile'

const Account = ({ user, orders, setProfile, name, loading }) => {
	const isRoot = user.role === 'root'
	const isDoctor = user.role === 'doctor'
	const isRootOrDoctor = isRoot || isDoctor

	useEffect(() => setProfile({ ...user }), [setProfile])
	return (
		<>
			{!loading ? <p>{name}</p> : <p>loading</p>}
			<AccountHeader {...user} />
			<AccountInformation />
			<ChangePassword />
			{isRootOrDoctor && <DoctorInformation />}
			<AccountOrders orders={orders} />
			{isRoot && <AccountPermissions currentUserId={user._id} />}
		</>
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

const mapStateToProps = ({ profile }) => ({
	...profile
})

export default connect(
	mapStateToProps,
	{ setProfile }
)(Account)
