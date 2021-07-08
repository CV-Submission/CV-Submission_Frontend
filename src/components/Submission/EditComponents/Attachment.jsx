import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Upload, message } from 'antd';
import {
	MinusCircleOutlined,
	PlusOutlined,
	InboxOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../styles.css';
import axios from 'axios';

function Attachment(props) {
	const [fileUpload, setFileUpload] = useState();
	const config = {
		headers: {
			Authorization: `Token ${localStorage.getItem('userToken')}`,
			'content-type': 'multipart/form-data',
			// 'content-type':'multipart/form-data; boundary=----WebKitFormBoundaryU5QJT3MDI9Clak3o',
		},
	};

	const onFinish = (values) => {

		let formData = new FormData();
		formData.append('File', fileUpload);
		formData.append('FileName', values.fileName);
		formData.append('submission_id', localStorage.getItem('submissionID'));

		axios
			.post(`http://localhost:8000/api/Attachment/`, formData, config)
			.then((res) => {
				console.log('attachment res ', res);
			})
			.catch((err) => {
				console.log('attachment error ', err);
			});
	};

	const testUpload = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};
	const onDrop = (e) => {
		console.log('Dropped files', e);
	};
	const normFile = (e) => {
		console.log('Upload event: ', e);
		if (e.fileList[0].originFileObj) setFileUpload(e.fileList[0].originFileObj);
		else setFileUpload(e.fileList[0]);
	};
	const onChange = (info) => {
		const { status } = info.file;
		if (status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (status === 'done') {
			console.log(`${info.file.name} file uploaded successfully.`);
		} else if (status === 'error') {
			console.log(`${info.file.name} file upload failed.`);
		}
	};

	return (
		<div className='container'>
			<Form
				name='attachment-form'
				onFinish={onFinish}
				autoComplete='off'
				layout='horizontal'>
				<Form.Item
					name='fileName'
					label='File Title'
					fieldKey='fileName'
					rules={[
						{ required: true, message: 'Missing File title' },
						{
							pattern: /^[A-Za-z0-9_-]*$/,
							message: 'Please enter valid file title',
						},
					]}>
					<Input placeholder='File title' />
				</Form.Item>
				<Form.Item label='Attachment'>
					<Form.Item
						name='dragger'
						valuePropName='fileList'
						getValueFromEvent={normFile}
						noStyle
						maxCount={1}
						accept='.pdf, .doc, .docx'>
						<Upload.Dragger
							maxCount={1}
							className='upload-file'
							accept='.pdf, .doc, .docx'
							name='files'
							onChange={(info) => onChange}
							onDrop={onDrop}
							customRequest={testUpload}>
							<p className='ant-upload-drag-icon'>
								<InboxOutlined />
							</p>
							<p className='ant-upload-text'>
								Click or drag file to this area to upload
							</p>
						</Upload.Dragger>
					</Form.Item>
				</Form.Item>
				<Form.List name='attachment-list' layout='vertical'>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, fieldKey, ...restField }) => (
								<Space
									key={key}
									style={{ display: 'flex', marginBottom: 8 }}
									align='baseline'>
									<Form.Item
										{...restField}
										name={[name, 'fileName']}
										label='File Title'
										fieldKey={[fieldKey, 'fileName']}
										rules={[
											{ required: true, message: 'Missing File title' },
											{
												pattern: /^[A-Za-z0-9_-]*$/,
												message: 'Please enter valid File title',
											},
										]}>
										<Input placeholder='File title' />
									</Form.Item>
									<Form.Item label='Attachment'>
										<Form.Item
											name='dragger'
											valuePropName='fileList'
											getValueFromEvent={normFile}
											noStyle
											maxCount={1}
											accept='.pdf, .doc, .docx'>
											<Upload.Dragger
												name='files'
												onChange={(info) => onChange}
												onDrop={onDrop}
												customRequest={testUpload}>
												<p className='ant-upload-drag-icon'>
													<InboxOutlined />
												</p>
												<p className='ant-upload-text'>
													Click or drag file to this area to upload
												</p>
											</Upload.Dragger>
										</Form.Item>
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
									Add Attachment
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Save
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Attachment;
