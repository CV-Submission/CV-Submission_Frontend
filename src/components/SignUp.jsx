import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './styles.css';

function SignUp(props) {
	const onFinish = (values) => {
		console.log('Success:', values);
	};

	return (
		<div className='container'>
			<Form
				name='normal_login'
				className='sign-form'
				layout='vertical'
				onFinish={onFinish}>
				<Form.Item
					label='First Name'
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
					label='Last Name'
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
					label='Username'
					name='username'
					tooltip='username can contain letters, numbers and dashes'
					rules={[
						{
							required: true,
							message: 'Please enter your Username!',
							whitespace: false,
						},
						{
							pattern: /^[A-Za-z0-9_-]*$/,
							message: 'username must contain at least one letter, one number',
						},
					]}>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Username'
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
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Email'
					/>
				</Form.Item>
				<Form.Item
					label='Password'
					name='password'
					tooltip='Password must be 6 characters long'
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please enter your Password',
						},
						{
							pattern: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.{6,})/,
							message:
								'Password must have at least one number, and one letter and is 6 characters long ',
						},
					]}>
					<Input.Password
						prefix={<LockOutlined className='site-form-item-icon' />}
						placeholder='Password'
					/>
				</Form.Item>
				<Form.Item
					label='Confirm Password'
					name='confirm-password'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'please re-enter your password',
							pattern: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.{6,})/,
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Confirm password does not match password!')
								);
							},
						}),
					]}>
					<Input.Password
						prefix={<LockOutlined className='site-form-item-icon' />}
						placeholder='Confirm password'
					/>
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit' className='sign-form-button'>
						Sign Up
					</Button>
					{/* Sign up Link */}
					Already have an account? <a href=''>Sign in</a>
				</Form.Item>
			</Form>
		</div>
	);
}

export default SignUp;

/* 

The password string will start this way
at least 1 lowercase, 1 uppercase, 1 numeric character, must be 6 characters or longer

*/
