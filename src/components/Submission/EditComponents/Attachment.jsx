import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Upload, Popconfirm } from 'antd';
import {
	MinusCircleOutlined,
	PlusOutlined,
	InboxOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../styles.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import apiUrl from './../../../APIConfig';

function Attachment(props) {
	const { submission_id } = useParams();
	const [fileUpload, setFileUpload] = useState();
	const [files, setFiles] = useState([]);
	const [prevAttachments, setPrevAttachments] = useState(
		JSON.parse(localStorage.getItem('userData_Attachments')) || []
	);
	// removing old items
	const removeItem = (id) => {
		axios
			.delete(`${apiUrl}/api/Attachment/${id}/`)
			.then((res) => {
				console.log('RES Delete Attachment ', res);
				const updated = prevAttachments.filter((ele) => ele.id !== id);
				setPrevAttachments(updated);
			})
			.catch((err) => console.log('ERROR Delete Attachment ', err));
	};

	// const prevAttachmentsList =
	const config = {
		headers: {
			Authorization: `Token ${localStorage.getItem('userToken')}`,
			'content-type': 'multipart/form-data',
			// 'content-type':'multipart/form-data; boundary=----WebKitFormBoundaryU5QJT3MDI9Clak3o',
		},
	};

	const onFinish = (values) => {
		console.log('Attachment $$$$', values);
		let formData = new FormData();
		formData.append('File', fileUpload);
		formData.append('FileName', values.fileName);
		formData.append('submission_id', submission_id);

		axios
			.post(`${apiUrl}/api/Attachment/`, formData, config)
			.then((res) => {
				console.log('attachment res ', res);
			})
			.catch((err) => {
				console.log('attachment error ', err);
			});

		let axiosList = [];
		let req = {};
		if (values['attachment-list'].length > 0) {
			for (let i = 0; i < values['attachment-list'].length; i++) {
				console.log("files from state, ", files)
				let formData = new FormData();
				formData.append('File', files[i+1]);
				formData.append('FileName', values['attachment-list'][i].fileName);
				formData.append('submission_id', submission_id);

				req = axios.post(`${apiUrl}/api/Attachment/`, formData, config);
				axiosList.push(req);
			}
			axios
				.all(axiosList)
				.then(
					axios.spread((...res) => {
						console.log('list post Attachment responses ', res);
					})
				)
				.catch((errors) => {
					console.log('List Attachment post errors ', errors);
				});
		}
	};

	const testUpload = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};
	const onDrop = (e) => {
		console.log('Dropped files', e);
	};
	
	const normFile = (e, key) => {
		// console.log('Upload event KEY: ', key)
		
		console.log('Upload event: ', e);
		if (e.fileList[0].originFileObj) {
			setFileUpload(e.fileList[0].originFileObj);
			
			setFiles([...files, e.fileList[0].originFileObj]);
			console.log("files added ", files)
			
		} else {
			setFileUpload(e.fileList[0]);
			setFiles([...files, e.fileList[0]]);
		}
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
		<div className='view'>
			{/* {prevAttachmentsList} */}
			<Form
				name='attachment-form'
				onFinish={onFinish}
				autoComplete='off'
				layout='horizontal'>
				{prevAttachments.map((ele, index) => (
					<div style={{ display: 'flex' }}>
						<p>File title: {ele['FileName']}</p> <hr />
						<p>File: {ele['File']}</p> <hr />
						<Popconfirm
							title='Are you sure to delete this attachment?'
							onConfirm={() => removeItem(ele.id)}
							// onCancel={cancel}
							okText='Yes'
							cancelText='No'>
							<MinusCircleOutlined style={{ color: 'red' }} />
						</Popconfirm>
						<hr />
					</div>
				))}
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
											fieldKey={[fieldKey, 'fileList']}
											valuePropName='fileList'
											getValueFromEvent={(e) => normFile(e, fieldKey)}
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
