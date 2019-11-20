import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import cookie from 'js-cookie'

import baseUrl from '../../utils/baseUrl'
import catchErrors from '../../utils/catchErrors'
import { addVaccine, addAllergy, addDisease } from '../../redux/actions/pet'
import Vaccines from '../../components/Pet/Vaccines'
import Allergies from '../../components/Pet/Allergies'
import Diseases from '../../components/Pet/Diseases'

const Record = ({ _id, role, addVaccine, addAllergy, addDisease }) => {
	const INITIAL_VACCINE = {
		name: '',
		date: new Date()
	}
	const token = cookie.get('token')
	const isDoctor = role === 'doctor'
	const isRoot = role === 'root'
	const isDoctorOrRoot = isDoctor || isRoot
	const [vaccine, setVaccine] = useState(INITIAL_VACCINE)
	const [allergy, setAllergy] = useState('')
	const [disease, setDisease] = useState('')
	const [successVaccine, setSuccessVaccine] = useState(false)
	const [loadingVaccine, setLoadingVaccine] = useState(false)
	const [disabledVaccine, setDisabledVaccine] = useState(true)
	const [errorVaccine, setErrorVaccine] = useState('')
	const [successAllergy, setSuccessAllergy] = useState(false)
	const [loadingAllergy, setLoadingAllergy] = useState(false)
	const [disabledAllergy, setDisabledAllergy] = useState(true)
	const [errorAllergy, setErrorAllergy] = useState('')
	const [successDisease, setSuccessDisease] = useState(false)
	const [loadingDisease, setLoadingDisease] = useState(false)
	const [disabledDisease, setDisabledDisease] = useState(true)
	const [errorDisease, setErrorDisease] = useState('')

	useEffect(() => {
		const isVaccine = Object.values(vaccine).every((element) =>
			Boolean(element)
		)
		isVaccine ? setDisabledVaccine(false) : setDisabledVaccine(true)
	}, [vaccine])

	useEffect(() => {
		const isAllergy = Object.values(allergy).every((element) =>
			Boolean(element)
		)
		isAllergy ? setDisabledAllergy(false) : setDisabledAllergy(true)
	}, [allergy])

	useEffect(() => {
		const isDisease = Object.values(disease).every((element) =>
			Boolean(element)
		)
		isDisease ? setDisabledDisease(false) : setDisabledDisease(true)
	}, [disease])

	const handleVaccineChange = (e) => {
		const { value } = e.target
		setVaccine((prevState) => ({ ...prevState, name: value }))
	}

	const handleAllergyChange = (e) => {
		const { value } = e.target
		setAllergy(value)
	}

	const handleDiseaseChange = (e) => {
		const { value } = e.target
		setDisease(value)
	}

	const handleAllergySubmit = async (e) => {
		e.preventDefault()
		try {
			setErrorAllergy('')
			setLoadingAllergy(true)
			const payload = { allergy }
			const url = `${baseUrl}/api/add/allergy/${_id}`
			const headers = { headers: { Authorization: token } }
			const { data } = await axios.put(url, payload, headers)
			addAllergy(data)
			setSuccessAllergy(true)
		} catch (error) {
			catchErrors(error, setErrorAllergy)
		} finally {
			setLoadingAllergy(false)
		}
	}

	const handleDiseaseSubmit = async (e) => {
		e.preventDefault()
		try {
			setErrorDisease('')
			setLoadingDisease(true)
			const payload = { disease }
			const url = `${baseUrl}/api/add/disease/${_id}`
			const headers = { headers: { Authorization: token } }
			const { data } = await axios.put(url, payload, headers)
			addDisease(data)
			setSuccessDisease(true)
		} catch (error) {
			catchErrors(error, setErrorAllergy)
		} finally {
			setLoadingDisease(false)
		}
	}

	const handleVaccineDateChange = (date) => {
		setVaccine((prevState) => ({ ...prevState, date }))
	}

	const handleVaccineSubmit = async (e) => {
		e.preventDefault()
		try {
			setErrorVaccine('')
			setLoadingVaccine(true)
			const { name, date } = vaccine
			const payload = { name, date }
			const url = `${baseUrl}/api/add/vaccine/${_id}`
			const headers = { headers: { Authorization: token } }
			const { data } = await axios.put(url, payload, headers)
			addVaccine(data)
			setSuccessVaccine(true)
		} catch (error) {
			catchErrors(error, setErrorVaccine)
		} finally {
			setLoadingVaccine(false)
		}
	}

	return (
		<>
			<Vaccines role={role} petId={_id} />
			{isDoctorOrRoot && (
				<>
					<Form
						onSubmit={handleVaccineSubmit}
						success={successVaccine}
						error={Boolean(errorVaccine)}
						loading={loadingVaccine}
					>
						<Form.Field
							control={Input}
							name='vaccine'
							label='Vaccine'
							placeholder='Vaccine'
							type='text'
							onChange={handleVaccineChange}
							value={vaccine.name}
						/>
						<Form.Group>
							<div className='field'>
								<label>Date</label>
								<DatePicker
									selected={vaccine.date}
									onChange={handleVaccineDateChange}
									peekNextMonth
									showMonthDropdown
									showYearDropdown
									dropdownMode='select'
								/>
							</div>
						</Form.Group>
						<Form.Field
							control={Button}
							color='blue'
							icon='pencil alternate'
							content='Submit'
							type='submit'
							disabled={disabledVaccine || loadingVaccine}
						/>
					</Form>
					<br />
				</>
			)}
			<Allergies role={role} petId={_id} />
			{isDoctorOrRoot && (
				<>
					<Form
						onSubmit={handleAllergySubmit}
						success={successAllergy}
						error={Boolean(errorAllergy)}
						loading={loadingAllergy}
					>
						<Form.Field
							control={Input}
							name='allergy'
							label='Allergy'
							placeholder='Allergy'
							type='text'
							onChange={handleAllergyChange}
							value={allergy}
						/>
						<Form.Field
							control={Button}
							color='blue'
							icon='pencil alternate'
							content='Submit'
							type='submit'
							disabled={disabledAllergy || loadingAllergy}
						/>
					</Form>
					<br />
				</>
			)}
			<Diseases role={role} petId={_id} />
			{isDoctorOrRoot && (
				<>
					<Form
						onSubmit={handleDiseaseSubmit}
						success={successDisease}
						error={Boolean(errorDisease)}
						loading={loadingDisease}
					>
						<Form.Field
							control={Input}
							name='disease'
							label='Disease'
							placeholder='Disease'
							type='text'
							onChange={handleDiseaseChange}
							value={disease}
						/>
						<Form.Field
							control={Button}
							color='blue'
							icon='pencil alternate'
							content='Submit'
							type='submit'
							disabled={disabledDisease || loadingDisease}
						/>
					</Form>
					<br />
				</>
			)}
		</>
	)
}

export default connect(null, { addVaccine, addAllergy, addDisease })(Record)
