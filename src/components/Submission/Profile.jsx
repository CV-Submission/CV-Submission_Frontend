import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../styles.css';

function Profile(props) {
    const onFinish = (values) => {
			console.log('Success:', values);
        };
    const onChange = (values) =>{

    }
    const userDetails = {
        "firstName" : "haneen",
        "lastName " : "alghamdi",
        "email" : "han@gmail.com",
    }
    const viewOnly = false; 
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
					{viewOnly ? (
						<Form.Item label='First name'>
							<span className='ant-form-text'>{userDetails['firstName']}</span>
						</Form.Item>
					) : (
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
					)}
					{viewOnly ? (
						<Form.Item label='Last name'>
							<span className='ant-form-text'>{userDetails['lastName']}</span>
						</Form.Item>
					) : (
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
					)}
					{viewOnly ? (
						<Form.Item label='Email Address'>
							<span className='ant-form-text'>{userDetails['email']}</span>
						</Form.Item>
					) : (
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
					)}
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='sign-form-button'>
							Save
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
}

export default Profile;