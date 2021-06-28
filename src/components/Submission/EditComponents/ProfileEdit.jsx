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

function ProfileEdit(props) {
	const provinceData = ['sa', 'sa'];
	const cityData = {
		sa: ['jed', 'makh'],
		sa: ['jed', 'makh'],
	};

	const [hasDependents, setHasDependents] = useState(true);
	const [cities, setCities] = useState(cityData[provinceData[0]]);
	const [Country, setCountry] = useState(cityData[provinceData[0]][0]);
	const [countryCode, setCountryCode] = useState('');
	const [userDetails, seUserDetails] = useState({
		firstName: 'haneen',
		'lastName ': 'alghamdi',
		email: 'han@gmail.com',
	});
	useEffect(() => {
		axios
			.get(`https://countriesnow.space/api/v0.1/countries/`)
			.then((response) => {
				setCountry(response.data.data);
				console.log(response.data.data);
				provinceData = response.data.data;
				cityData = response.data.data[1];
				// console.log(Country);
			})
			.catch((error) => {
				console.log('API ERROR:', error);
			});
	}, []);

	const prefixSelector = (
		<Form.Item name='prefix' noStyle>
			<Select
				style={{
					width: 70,
				}}>
				<Option value={countryCode}>{countryCode}</Option>
			</Select>
		</Form.Item>
	);
	const onFinish = (values) => {
		console.log('Success:', values);
	};
	const onChange = (values) => {
		console.log('form values ---', values);
		if (values == 'married') setHasDependents(true);
		else setHasDependents(false);
	};

	const handleProvinceChange = (value) => {
		setCities(cityData[value]);
		setCountry(cityData[value][0]);
	};

	const onSecondCityChange = (value) => {
		setCountry(value);
	};

	return (
		<div className='container'>
			<Form
				name='normal_login'
				className='sign-form'
				layout='vertical'
				initialValues={{
					firstName: userDetails['firstName'],
					lastName: userDetails['lastName'],
					emial: userDetails['email'],
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
					name='phone'
					label='Phone Number'
					rules={[
						{
							required: true,
							message: 'Please input your phone number!',
						},
					]}>
					<Input
						addonBefore={prefixSelector}
						prefix={<PhoneOutlined className='site-form-item-icon' />}
						style={{
							width: '100%',
						}}
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
					<DatePicker />
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

				<Form.Item>
					<Select
						defaultValue={provinceData[0]}
						style={{ width: 120 }}
						onChange={handleProvinceChange}>
						{provinceData.map((province) => (
							<Option key={province}>{province}</Option>
						))}
					</Select>
					<Select
						style={{ width: 120 }}
						value={setCountry}
						onChange={onSecondCityChange}>
						{cities.map((city) => (
							<Option key={city}>{city}</Option>
						))}
					</Select>
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
