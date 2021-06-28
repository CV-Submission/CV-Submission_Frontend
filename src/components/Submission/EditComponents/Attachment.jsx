import React from 'react';
import { Form, Input, Button, Space, Upload } from 'antd';
import {
	MinusCircleOutlined,
	PlusOutlined,
	InboxOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../styles.css'

function Attachment(props) {
	const onFinish = (values) => {
		console.log('Received values of form:', values);
		/*
		var file = new FormData();
    file.append('name',files[0])
    var req=request
              .post('http://localhost:8000/api/v0/image/')
              .send(file);
    req.end(function(err,response){
        console.log("upload done!!!!!");
    }); */
	};
	const onDrop = (e) => {
		// console.log('Dropped files', e.dataTransfer.files);
	};
	const normFile = (e) => {
		console.log('Upload event:', e);

		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
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
						onDrop={onDrop()}
						noStyle
						maxCount={1}
						accept='.pdf, .doc, .docx'>
						<Upload.Dragger name='files'>
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
										<Input placeholder='Degree title' />
									</Form.Item>
									<Form.Item label='Attachment'>
										<Form.Item
											name='dragger'
											valuePropName='fileList'
											getValueFromEvent={normFile}
											onDrop={onDrop()}
											noStyle
											maxCount={1}
											accept='.pdf, .doc, .docx'>
											<Upload.Dragger name='files'>
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
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Attachment;
