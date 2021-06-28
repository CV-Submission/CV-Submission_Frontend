import React, { useState } from 'react';
import { Form, Button } from 'antd';

function View(props) {
	const [userDetails, seUserDetails] = useState({
		firstName: 'haneen',
		lastName: 'alghamdi',
		email: 'han@gmail.com',
		phone: '557682817',
		'phone-prefix': '+966',
		'date-of-birth': '2/2/2000',
		'years-of-expereince': 5,
		'martial-status': 'Married',
		'number-of-dependents': 2,
		city: 'Jeddah',
		country: 'Saudi Arabia',
		education: [],
		attachment: [],
	});
	const onFinish = (values) => {
		console.log('Success:', values);
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
					email: userDetails['email'],
				}}
				onFinish={onFinish}>
				<Form.Item label='First name'>
					<span className='ant-form-text'>{userDetails['firstName']}</span>
				</Form.Item>
				<Form.Item label='Last name'>
					<span className='ant-form-text'>{userDetails['lastName']}</span>
				</Form.Item>
				<Form.Item label='Email Address'>
					<span className='ant-form-text'>{userDetails['email']}</span>
				</Form.Item>
				<Form.Item label='Phone Number'>
					<span className='ant-form-text'>
						{userDetails['phone-prefix']} " "{userDetails['phone']}
					</span>
				</Form.Item>
				<Form.Item label='Date of Birth'>
					<span className='ant-form-text'>{userDetails['date-of-birth']}</span>
				</Form.Item>
				<Form.Item label='Years of Expereince'>
					<span className='ant-form-text'>
						{userDetails['years-of-expereince']}
					</span>
				</Form.Item>
				<Form.Item label='Martial Status'>
					<span className='ant-form-text'>{userDetails['martial-status']}</span>
				</Form.Item>
				<Form.Item label='Number of Dependents'>
					<span className='ant-form-text'>
						{userDetails['number-of-dependents']}
					</span>
				</Form.Item>
				<Form.Item label='Country'>
					<span className='ant-form-text'>{userDetails['country']}</span>
				</Form.Item>
				<Form.Item label='City'>
					<span className='ant-form-text'>{userDetails['city']}</span>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit' className='sign-form-button'>
						Edit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default View;
