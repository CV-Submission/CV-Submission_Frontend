import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Form,
	Input,
	Button,
	DatePicker,
	InputNumber,
	Select,
	AutoComplete,
} from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../styles.css';

const { Option } = Select;
let country_options = [];

function ProfileEdit(props) {
	const userData = localStorage.getItem('userDetails');
	const [hasDependents, setHasDependents] = useState(true);
	const [Country, setCountry] = useState();
	const [city_option, setcity_option] = useState([]);
	const [CountryCode, setCountryCode] = useState();
	const [SelectedCode, setSelectedCode] = useState();
	const [selectedCountry, setSelectedCountry] = useState();
	const [selectedCity, setSelectedCity] = useState();
	const [userDetails, seUserDetails] = useState({
		firstName: 'haneen', // userData.firstName
		lastName: 'alghamdi', // userData.lastName
		email: 'han@gmail.com', // userData.email // userData
	});

	const selectCountry = (val) => {
		console.log('country ---', val);
	};
	const selectCity = (val) => {
		console.log('city ---- ', val);
	};
	useEffect(() => {
		axios
			.get(`https://countriesnow.space/api/v0.1/countries/`)
			.then((response) => {
				console.log(response.data.data[0].country);
				console.log(response.data.data[0].cities);
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

	useEffect(() => {
		axios
			.get(`https://countriesnow.space/api/v0.1/countries/codes`)
			.then((response) => {
				console.log('COUNTRY CODE:', response.data.data);
				setCountryCode(response.data.data);
			})
			.catch((error) => {
				console.log('API ERROR:', error);
			});
	}, []);

	const onFinish = (values) => {
		console.log('Success:', values);

		const data = {
			firstName: values['first-name'],
			lastName: values['last-name'],
			email: values.email,
			dateOfBirth: '2000/3/3',// values['date-of-bitrh'],
			country: selectedCountry,
			city: selectedCity,
			numberOfDependents: values['number-of-dependents'] || 0,
			yearsOdExperience: values['years-of-expereince'],
			phone: values.phone,
			martialStatus: values['martial-status'],
		};
		const token = localStorage.getItem('userToken');
		const config = {
			headers: {
				Authorization: `Token ${token}`,
			},
		};
		console.log('form data ---', data);
		axios
			.post('http://127.0.0.1:8000/api/UserDetial', data, config)
			.then((res) => console.log('Profile updated ---', res))
			.catch((err) => console.log('profile edit error ---', err));
	};
	const onChange = (values) => {
		console.log('form values ---', values);
		if (values == 'married') setHasDependents(true);
		else setHasDependents(false);
	};

	// const handleProvinceChange = (value) => {
	// 	setCities(cityData[value]);
	// 	setCountry(cityData[value][0]);
	// };

	// const onSecondCityChange = (value) => {
	// 	setCountry(value);
	// };

	return (
		<div className='container'>
			<Form
				name='normal_login'
				className='sign-form'
				layout='vertical'
				initialValues={{
					'first-name': userDetails['firstName'],
					'last-name': userDetails['lastName'],
					email: userDetails['email'],
				}}
				onFinish={onFinish}>
				<Form.Item
					label='First Name:'
					name='first-name'
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
					name='last-name'
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
					name='email'
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
					name='date-of-birth'
					label='Date of Birth'
					rules={[
						{
							type: 'object',
							required: true,
							message: 'Please select Date of birth!',
						},
					]}>
					<DatePicker format='DD-MM-YYYY' onChange={val=> console.log('this is date picker ---', val)} />
				</Form.Item>

				<Form.Item label='Years of experience'>
					<Form.Item name='years-of-expereince' noStyle>
						<InputNumber min={0} max={10} />
					</Form.Item>
				</Form.Item>
				<Form.Item
					name='martial-status'
					label='Martial Status'
					rules={[
						{
							required: true,
							message: 'Please select Martial Status!',
						},
					]}>
					<Select placeholder='select your Martial Status' onChange={onChange}>
						<Option value='single'>Single</Option>
						<Option value='married'>Married</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label='Number of dependents'
					style={!hasDependents ? { display: 'none' } : { display: 'block' }}>
					<Form.Item name='number-of-dependents' noStyle>
						<InputNumber min={0} max={10} />
					</Form.Item>
				</Form.Item>
				<Form.Item label='Country'>
					<Select
						style={{
							width: 200,
						}}
						showSearch
						onChange={(event) => {
							console.log('onChange@@', event);
							let find_city = Country.find(function (element, index) {
								if (element.country == event) return true;
							});
							console.log(find_city.cities);
							setcity_option(find_city.cities);
							console.log(city_option);
							console.log(city_option);
							let find_code = CountryCode.find(function (element, index) {
								if (element.name == event) return true;
							});
							setSelectedCode(find_code.dial_code);
							console.log('find_code', find_code.dial_code);
							setSelectedCountry(event);
						}}
						options={country_options}
						placeholder='type yor country'
						filterOption={(inputValue, option) =>
							option.value.toUpperCase().includes(inputValue.toUpperCase())
						}></Select>
				</Form.Item>
				<Form.Item label='City'>
					<Select
						showSearch
						style={{ width: 200 }}
						onChange={(value) => {
							console.log('onChange', value);
							setSelectedCity(value);
						}}
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
					name='phone'
					label='Phone Number'
					rules={[
						{
							required: true,
							message: 'Please enter your phone number!',
						},
					]}>
					<Input
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
