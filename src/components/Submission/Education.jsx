import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../styles.css';

function Education(props) {
	const onFinish = (values) => {
		console.log('Received values of form:', values);
	};

	return (
		<div className='container'>
			<Form
				name='education-form'
				onFinish={onFinish}
				autoComplete='off'
				layout='vertical'>
				<Form.Item
					name='degree-title'
					label='Degree Title'
					fieldKey='degraa-title'
					rules={[
						{ required: true, message: 'Missing Degree title' },
						{
							pattern: /^[A-Za-z]+$/,
							message: 'Please enter valid degree title',
						},
					]}>
					<Input placeholder='Degree title' />
				</Form.Item>
				<Form.Item
					name='university-name'
					label='University Name'
					fieldKey='university-name'
					rules={[
						{ required: true, message: 'Missing university name' },
						{
							pattern: /^[A-Za-z]+$/,
							message: 'Please enter valid university title',
						},
					]}>
					<Input placeholder='University Name' />
				</Form.Item>
				<Form.Item
					name='gpa'
					label='GPA'
					fieldKey='gpa'
					tooltip='Out of 5'
					rules={[
						{ required: true, message: 'Missing GPA' },
						{
							pattern: /^[0-9]+$/,
							message: 'Please enter valid GPA',
						},
					]}>
					<Input placeholder='GPA' />
				</Form.Item>
				<Form.List name='education-list' layout='vertical'>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, fieldKey, ...restField }) => (
								<Space
									key={key}
									style={{ display: 'flex', marginBottom: 8 }}
									align='baseline'>
									<Form.Item
										{...restField}
										name={[name, 'degree-title']}
										label='Degree Title'
										fieldKey={[fieldKey, 'degree-title']}
										rules={[
											{ required: true, message: 'Missing Degree title' },
											{
												pattern: /^[A-Za-z]+$/,
												message: 'Please enter valid degree title',
											},
										]}>
										<Input placeholder='Degree title' />
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, 'university-name']}
										label='University Name'
										fieldKey={[fieldKey, 'university-name']}
										rules={[
											{ required: true, message: 'Missing university name' },
											{
												pattern: /^[A-Za-z]+$/,
												message: 'Please enter valid university title',
											},
										]}>
										<Input placeholder='University Name' />
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, 'gpa']}
										label='GPA'
										fieldKey={[fieldKey, 'gpa']}
										rules={[
											{ required: true, message: 'Missing GPA' },
											{
												pattern: /^[0-9]+$/,
												message: 'Please enter valid GPA',
											},
										]}>
										<Input placeholder='GPA' />
									</Form.Item>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							))}
							<Form.Item>
								<Button
									type='dashed'
									onClick={() => add()}
									block
									icon={<PlusOutlined />}>
									Add Education
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Education;