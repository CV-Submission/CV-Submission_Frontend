import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, DatePicker, InputNumber, Select, AutoComplete } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../styles.css';
import NATIONALITIES from '../../../nationalities'

const { Option } = Select;
let nationalityOptions = [...NATIONALITIES.map((ele) => ({ value: ele }))];
let country_options = [];

function ProfileEdit(props) {
	const config = {
		headers: {
			Authorization: `Token ${localStorage.getItem('userToken')}`,
			'content-type': 'application/json',
		},
	};
	const [hasDependents, setHasDependents] = useState(false);
	const [Country, setCountry] = useState();
	const [city_option, setcity_option] = useState([]);
	const [CountryCode, setCountryCode] = useState();
	const [SelectedCode, setSelectedCode] = useState();
	const [userDetails, seUserDetails] = useState({
		FirstName: JSON.parse(localStorage.getItem('get_userData')).user.first_name, 
		LastName: JSON.parse(localStorage.getItem('get_userData')).user.last_name, 
		Email: JSON.parse(localStorage.getItem('get_userData')).user.email, 
	});

	const handleCountry = (event) => {
		let find_city = Country.find(function (element, index) {
			if (element.country == event) return true;
		});
		setcity_option(find_city.cities);
		let find_code = CountryCode.find(function (element, index) {
			if (element.name == event) return true;
		});
		setSelectedCode(find_code.dial_code);
	};

	// GET country options
	useEffect(() => {
		axios
			.get(`https://countriesnow.space/api/v0.1/countries/`)
			.then((response) => {
				setCountry(response.data.data);
				let countryMap = response.data.data;
				countryMap.map((elem, index) => {
					country_options.push({ value: elem.country });
				});
			})
			.catch((error) => {
				console.log('API ERROR:', error);
			});
	}, []);

	// GET country codes
	useEffect(() => {
		axios
			.get(`https://countriesnow.space/api/v0.1/countries/codes`)
			.then((response) => {
				setCountryCode(response.data.data);
			})
			.catch((error) => {
				console.log('API ERROR:', error);
			});
	}, []);
	

	// GET User details 
	useEffect(() => {
		const data = { submission_id: localStorage.getItem('submissionID') };
		axios
			.get(`http://127.0.0.1:8000/api/UserDetial/`, data, config)
			.then((res) => {
				console.log('Profile GET &&&&&&& ---', res);
			})
			.catch((err) => console.log('profile GET &&&&& ---', err));
	}, []);

	// User Details Submit 
	const onFinish = (values) => {
		// console.log('Success: @@@@@@@@@@@@@@@@@', values);

		const data = {
			FirstName: values['FirstName'],
			LastName: values.LastName,
			Email: values.Email,
			dateOfBirth: JSON.stringify(values.dateOfBirth),
			Country: values.Country,
			City: values.City,
			NumberOfDependents: values['NumberOfDependents'] || 0,
			YearsOfExpereince: values['YearsOfExpereince'],
			MobileNumber: values.MobileNumber,
			MartialStatus: values['MartialStatus'],
			CountryCode: SelectedCode,
			Nationality: values.Nationality,
			submission_id: localStorage.getItem('submissionID'), // get submission id from local storage, made on create
		};

		axios
			.post(`http://127.0.0.1:8000/api/UserDetial/`, data, config)
			.then((res) => {
				console.log('Profile updated ---', res);
				localStorage.setItem('userData_General', JSON.stringify(res.data));
			})
			.catch((err) => console.log('profile edit error ---', err));
	};

	// toggle dependants field
	const handleMartialStatusChange = (values) => {
		console.log('form values ---', values);
		if (values == 'Married') setHasDependents(true);
		else setHasDependents(false);
	};

	return (
		<div>
			<Form
				name='profile-edit'
				layout='vertical'
				initialValues={{
					FirstName: userDetails['FirstName'],
					LastName: userDetails['LastName'],
					Email: userDetails['Email'],
				}}
				onFinish={onFinish}>
				<Form.Item
					label='First Name:'
					name='FirstName'
					rules={[
						{
							required: true,
							message: 'Please enter your first name!',
						},
						{
							pattern: /^[A-Za-z]+$/,
							message: 'Please enter valid name',
						},
					]}>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='First name'
					/>
				</Form.Item>

				<Form.Item
					label='Last Name:'
					name='LastName'
					rules={[
						{
							required: true,
							message: 'Please enter your last name!',
						},
						{
							pattern: /^[A-Za-z]+$/,
							message: 'Please enter valid name',
						},
					]}>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Last name'
					/>
				</Form.Item>

				<Form.Item
					label='Email Address'
					name='Email'
					rules={[
						{
							required: true,
						},
						{
							type: 'email',
							message: 'Please enter valid Email',
						},
					]}>
					<Input
						prefix={<MailOutlined className='site-form-item-icon' />}
						placeholder='Email'
					/>
				</Form.Item>
				<Form.Item
					name='dateOfBirth'
					label='Date of Birth'
					rules={[
						{
							type: 'object',
							required: true,
							message: 'Please select Date of birth!',
						},
					]}>
					<DatePicker
						format='DD-MM-YYYY'
						onChange={(val) => console.log('this is date picker ---', val)}
					/>
				</Form.Item>

				<Form.Item label='Years of experience' name='YearsOfExpereince'>
					<InputNumber min={0} max={10} />
				</Form.Item>
				<Form.Item
					name='MartialStatus'
					label='Martial Status'
					rules={[
						{
							required: true,
							message: 'Please select Martial Status!',
						},
					]}>
					<Select
						placeholder='select your Martial Status'
						onChange={handleMartialStatusChange}>
						<Option value='Single'>Single</Option>
						<Option value='Married'>Married</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label='Number of dependents'
					name='NumberOfDependents'
					style={!hasDependents ? { display: 'none' } : { display: 'block' }}>
					<InputNumber min={0} max={10} />
				</Form.Item>
				<Form.Item
					label='Country'
					name='Country'
					rules={[
						{
							required: true,
							message: 'Please enter your country!',
						},
					]}>
					<Select
						style={{
							width: 200,
						}}
						showSearch
						onChange={(e) => handleCountry(e)}
						options={country_options}
						placeholder='type your country'
						filterOption={(inputValue, option) =>
							option.value.toUpperCase().includes(inputValue.toUpperCase())
						}></Select>
				</Form.Item>
				<Form.Item
					label='City'
					name='City'
					rules={[
						{
							required: true,
							message: 'Please enter your country!',
						},
					]}>
					<Select
						showSearch
						style={{ width: 200 }}
						placeholder='type your city '
						filterOption={(inputValue, option) =>
							option.value.toUpperCase().includes(inputValue.toUpperCase())
						}>
						{city_option.length > 0
							? city_option.map((item) => <Option key={item}>{item}</Option>)
							: null}
					</Select>
				</Form.Item>
				<Form.Item
					label='Nationality:'
					name='Nationality'
					rules={[
						{
							required: true,
							message: 'Please enter your nationality!',
						},
					]}>
					<AutoComplete
						style={{
							width: 200,
						}}
						options={nationalityOptions}
						placeholder='type your nationality'
						filterOption={(inputValue, option) =>
							option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
							-1
						}
					/>
				</Form.Item>
				<Form.Item
					name='MobileNumber'
					label='Phone Number'
					rules={[
						{
							required: true,
							message: 'Please enter your phone number!',
						},
					]}>
					<Input
						prefix={<PhoneOutlined />}
						addonBefore={SelectedCode}
						style={{
							width: '100%',
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit' className='sign-form-button'>
						Save
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default ProfileEdit;
