import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './styles.css';

function SignIn(props) {
	const onFinish = (values) => {
		console.log('Success:', values);
	};

	// const onFinishFailed = (errorInfo) => {
	// 	console.log('Failed:', errorInfo);
	// };

	return (
		<div className='container'>
			<Form
				name='normal_login'
				className='sign-form'
				onFinish={onFinish}>
				<Form.Item
                    label="Username"
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
                    label="Password"
					name='password'
					rules={[
						{
							required: true,
							message: 'Please enter your Password!',
						},
						{
							pattern: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.{6,})/,
							message:
								'Password is invalid ',
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
					Don't have an account? <a href=''>Sign Up now!</a>
				</Form.Item>
			</Form>
		</div>
	);
}

export default SignIn;
