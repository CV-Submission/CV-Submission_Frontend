import React, { useState } from 'react';
import { Button, Collapse, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

const { Panel } = Collapse;

function View(props) {

	let history = useHistory();
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
		education: [
			{
				'degree-title': 'diploma',
				gpa: 5,
				'university-name': 'ksu',
			},
		],
		attachment: [{
			"file-title" : "certificate",
			file: "file"
		}],
	});

	const handleClick = () => { 
		console.log("edit clicked")
		history.push('/edit') 
	}
	
	return (
		<div className=''>
			<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
				<Collapse defaultActiveKey={['1']} ghost>
					<Panel header='General details' key='1'>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>First Name: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['firstName']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Last Name: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['lastName']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Email Address: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['email']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Phone Number: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>
									{userDetails['phone-prefix']}
									{userDetails['phone']}
								</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Date of birth: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['date-of-birth']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Martial Status: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['martial-status']}</p>
							</Col>
						</Row>
						{userDetails['number-of-dependents'] > 0 ? (
							<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
								<div className='col'>
									<p>Number of dependents: </p>
								</div>
								<div className='col'>
									<p>{userDetails['number-of-dependents']}</p>
								</div>
							</Row>
						) : (
							''
						)}
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Years of expereince: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['years-of-expereince']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Country: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['country']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>City: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['city']}</p>
							</Col>
						</Row>
					</Panel>
					<Panel header='Education' key='2'>
						{userDetails.education.map((ele, index) => (
							<div>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className='gutter-row' span={12}>
										<p>Degree Title: </p>
									</Col>
									<Col className='gutter-row' span={12}>
										<p>{ele['degree-title']}</p>
									</Col>
								</Row>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className='gutter-row' span={12}>
										<p>GPA: </p>
									</Col>
									<Col className='gutter-row' span={12}>
										<p>{ele['gpa']}</p>
									</Col>
								</Row>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className='gutter-row' span={12}>
										<p>University name: </p>
									</Col>
									<Col className='gutter-row' span={12}>
										<p>{ele['university-name']}</p>
									</Col>
								</Row>
							</div>
						))}
					</Panel>
					<Panel header='Attachments' key='3'>
						{userDetails.attachment.map((ele, index) => (
							<div>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className='gutter-row' span={12}>
										<p>File title: </p>
									</Col>
									<Col className='gutter-row' span={12}>
										<p>{ele['file-title']}</p>
									</Col>
								</Row>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className='gutter-row' span={12}>
										<p>File: </p>
									</Col>
									<Col className='gutter-row' span={12}>
										<p>{ele['file']}</p>
									</Col>
								</Row>
							</div>
						))}
					</Panel>
				</Collapse>
			</Row>

			<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
				<Button
					type='primary'
					htmlType='button'
					className='sign-form-button'
					onClick={handleClick}>
					Edit
				</Button>
			</Row>
		</div>
	);
}

export default View;
