import axios from 'axios'

import DoctorProfile from '../components/Doctor/DoctorProfile'
import baseUrl from '../utils/baseUrl'

const Doctors = ({ doctors }) => {
	return (
		<>
			{doctors.map((doctor) => (
				<DoctorProfile key={doctor._id} {...doctor} />
			))}
		</>
	)
}

Doctors.getInitialProps = async () => {
	const url = `${baseUrl}/api/users/doctors`
	const { data } = await axios.get(url)
	return {
		doctors: data
	}
}

export default Doctors
