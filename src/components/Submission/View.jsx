import React, { useState, useEffect } from 'react';
import { Button, Collapse, Row, Col } from 'antd';
import axios from 'axios'
import { useHistory, useParams , Link} from 'react-router-dom';

const { Panel } = Collapse;

function View(props) {
let history = useHistory();
	const [attachments, setAttachments ] = useState([])
	const [education, setEducation] = useState([]);
	const [userDetails, setUserDetails] = useState({});
	const [userData, setUserData] = useState({}) // from server 

	const { submission_id } = useParams();
	useEffect(()=>{
		const config = {
			headers: {
				'content-type': 'application/json',
				Authorization: `Token ${localStorage.getItem('userToken')}`,
			},
		};
		
		// GET user model data
		axios
			.get(`http://127.0.0.1:8000/api-token-auth/user`, config)
			.then((res) => {
				console.log('res in view ', res);
				localStorage.setItem('get_userData', JSON.stringify(res.data))
				setUserData(res.data)
			})
			.catch((err) => console.log('ERROR in view ', err));

			// GET user general details 
			axios
				.get(`http://127.0.0.1:8000/api/UserDetial/`, config)
				.then((res) => {
					console.log('res in view USER DETIALS ', res);
					// set local storage res.data[0] 
					localStorage.setItem('userData_General', JSON.stringify(res.data[0]));
					setUserDetails(res.data[0])
				})
				.catch((err) =>
					console.log('ERROR in view USER DETIALS ', err)
				);

				// GET attachment 
				axios
					.get(`http://localhost:8000/api/Attachment/`, config)
					.then((res) => { 
						console.log('res get attchments ', res)
						// set local storage 
						localStorage.setItem(
							'userData_Attachments',
							JSON.stringify(res.data)
						);
						setAttachments(res.data);
					})
					.catch((err) => console.log('Error get attchments ', err));

					// GET Education
					axios
						.get(`http://127.0.0.1:8000/api/Education/`, config)
						.then((res) => {
							console.log('RES GET education ', res);
							localStorage.setItem(
								'userData_Education',
								JSON.stringify(res.data)
							);
							setEducation(res.data)
						})
						.catch((err) => console.log('ERROR GET education ', err));
	}, [])
	return (
		<div className='view'>
			<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
			style={{ margin: "5% 7% 7% 8%"}}
			>
				<Collapse defaultActiveKey={['1']} ghost>
					<Panel header='General details' key='1'>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>First Name: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['FirstName'] || userData['first_name']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Last Name: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['LastName'] || userData['last_name']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Email Address: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['Email'] || userData['email']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Phone Number: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>
									{userDetails['CountryCode'] || '-'}
									{userDetails['MobileNumber'] || '-'}
								</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Date of birth: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['dateOfBirth'] || '-'}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Martial Status: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['MartialStatus'] || '-'}</p>
							</Col>
						</Row>
						{userDetails['number-of-dependents'] > 0 ? (
							<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
								<div className='col'>
									<p>Number of dependents: </p>
								</div>
								<div className='col'>
									<p>{userDetails['NumberOfDependents'] || '-'}</p>
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
								<p>{userDetails['YearsOfExpereince'] || '-'}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Country: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['Country'] || '-'}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>City: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['City'] || '-'}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Nationality: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['Nationality'] || '-'}</p>
							</Col>
						</Row>
					</Panel>
					<Panel header='Education' key='2'>
						{education.map((ele, index) => (
							<div>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className='gutter-row' span={12}>
										<p>Degree Title: </p>
									</Col>
									<Col className='gutter-row' span={12}>
										<p>{ele['DegreeTitle']}</p>
									</Col>
								</Row>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className='gutter-row' span={12}>
										<p>GPA: </p>
									</Col>
									<Col className='gutter-row' span={12}>
										<p>{ele['GPA']}</p>
									</Col>
								</Row>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className='gutter-row' span={12}>
										<p>University name: </p>
									</Col>
									<Col className='gutter-row' span={12}>
										<p>{ele['University']}</p>
									</Col>
								</Row>
							</div>
						))}
					</Panel>
					<Panel header='Attachments' key='3'>
						{attachments.map((ele, index) => (
							<div>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className='gutter-row' span={12}>
										<p>File title: </p>
									</Col>
									<Col className='gutter-row' span={12}>
										<p>{ele['FileName']}</p>
									</Col>
								</Row>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className='gutter-row' span={12}>
										<p>File: </p>
									</Col>
									<Col className='gutter-row' span={12}>
										<p>{ele['File']}</p>
									</Col>
								</Row>
							</div>
						))}
					</Panel>
				</Collapse>
			</Row>
			<Row 
			style={{ margin: "5% 7% 7% 8%"}}
			gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
				<Link to={`/edit/${submission_id}`}>
					<Button type='primary' htmlType='button' className='sign-form-button'>
						Edit
					</Button>
				</Link>
			</Row>
		</div>
	);
}

export default View;
