import React, { useState } from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './styles.css';
import apiUrl from './../APIConfig';

function SignIn(props) {
	// const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	// const { state } = useLocation();
	let history = useHistory();

	const onFinish = (values) => {
		console.log('Success:', values);

		const data = JSON.stringify({
			username: values.username,
			password: values.password,
		});
		const config = {
			headers: { 'content-type': 'application/json' },
		};
		axios
			.post(`${apiUrl}/api-token-auth/auth`, data, config)
			.then((res) => {
				console.log('RES sign in ', res);
				localStorage.setItem('userToken', res.data.token);
				// setRedirectToReferrer(true);
				history.push('/submissions');
			})
			.catch((err) => console.log('ERROR sign in', err));

		// if (redirectToReferrer === true) {
		// 	return <Redirect to={state?.from || '/submissions'} />;
		// }
	};

	return (
		<div className='container'>
			<Form name='normal_login' className='sign-form' onFinish={onFinish}>
				<Form.Item
					label='Username'
					name='username'
					rules={[
						{
							required: true,
							message: 'Please enter your Username!',
						},
						{
							pattern: /^[A-Za-z0-9_-]*$/,
							message: 'username is invalid',
						},
					]}>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Username'
					/>
				</Form.Item>
				<Form.Item
					label='Password'
					name='password'
					rules={[
						{
							required: true,
							message: 'Please enter your Password!',
						},
						{
							pattern: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.{6,})/,
							message: 'Password is invalid ',
						},
					]}>
					<Input.Password
						prefix={<LockOutlined className='site-form-item-icon' />}
						placeholder='Password'
					/>
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit' className='sign-form-button'>
						Sign in
					</Button>
					Don't have an account? <Link to='/sign-up'>Sign Up now!</Link>
				</Form.Item>
			</Form>
		</div>
	);
}

export default SignIn;
