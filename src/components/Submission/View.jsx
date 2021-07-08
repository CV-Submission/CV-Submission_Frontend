import React, { useState, useEffect } from 'react';
import { Button, Collapse, Row, Col } from 'antd';
import axios from 'axios'
import { useHistory, useParams , Link} from 'react-router-dom';

const { Panel } = Collapse;

function View(props) {

	const [attachments, setAttachments ] = useState()
	const [userDetails, setUserDetails] = useState({
		FirstName:
			'test' || JSON.parse(localStorage.getItem('userData_general')).FirstName,
		LastName:
			'test' || JSON.parse(localStorage.getItem('userData_general')).LastName,
		Email: 'test' || JSON.parse(localStorage.getItem('userData_general')).Email,
		MobileNumber:
			'test' ||
			JSON.parse(localStorage.getItem('userData_general')).MobileNumber,
		CountryCode:
			'test' ||
			JSON.parse(localStorage.getItem('userData_general')).CountryCode,
		dateOfBirth:
			'test' ||
			JSON.parse(localStorage.getItem('userData_general')).dateOfBirth,
		YearsOfExpereince:
			'test' ||
			JSON.parse(localStorage.getItem('userData_general')).YearsOfExpereince,
		MartialStatus:
			'test' ||
			JSON.parse(localStorage.getItem('userData_general')).MartialStatus,
		NumberOfDependents:
			'test' ||
			JSON.parse(localStorage.getItem('userData_general')).NumberOfDependents,
		City: 'test' || JSON.parse(localStorage.getItem('userData_general')).City,
		Country:
			'test' || JSON.parse(localStorage.getItem('userData_general')).Country,
		Nationality:
			'test' ||
			JSON.parse(localStorage.getItem('userData_general')).Nationality,

		education: [
			{
				'degree-title': 'diploma',
				gpa: 5,
				'university-name': 'ksu',
			},
		],
		attachment: [
			{
				'file-title': 'certificate',
				file: 'file',
			},
		],
	});
	const [userData, setUserData] = useState() // from server 

	const { submission_id } = useParams();
	useEffect(()=>{
		const config = {
			headers: {
				'content-type': 'application/json',
				Authorization: `Token ${localStorage.getItem('userToken')}`,
			},
		};
		
		axios
			.get(`http://127.0.0.1:8000/api-token-auth/user`, config)
			.then((res) => {
				console.log('res in view ', res);
				localStorage.setItem('get_userData', JSON.stringify(res.data))
				setUserData(res.data)
				setUserDetails({
					...userDetails,
					FirstName: res.data.user.first_name,
					LastName: res.data.user.last_name,
					Email: res.data.user.email,
				});
			})
			.catch((err) => console.log('ERROR in view ', err));

			
			axios
				.get(`http://127.0.0.1:8000/api/UserDetial/`, config)
				.then((res) => {
					console.log('res in view USER DETIALS ', res);
				})
				.catch((err) =>
					console.log('ERROR in view USER DETIALS ', err)
				);

				// get attachment 
				axios
					.get(`http://localhost:8000/api/Attachment/`, config)
					.then((res) => { 
						console.log('res get attchments ', res)
						const att = res.filter( (ele,id) => ele.submission_id === submission_id )
						setAttachments([...attachments, att]);
					})
					.catch((err) => console.log('Error get attchments ', err));

	}, [])

	
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
								<p>{userDetails['FirstName']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Last Name: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['LastName']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Email Address: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['Email']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Phone Number: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>
									{userDetails['CountryCode']}
									{userDetails['MobileNumber']}
								</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Date of birth: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['dateOfBirth']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Martial Status: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['MartialStatus']}</p>
							</Col>
						</Row>
						{userDetails['number-of-dependents'] > 0 ? (
							<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
								<div className='col'>
									<p>Number of dependents: </p>
								</div>
								<div className='col'>
									<p>{userDetails['NumberOfDependents']}</p>
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
								<p>{userDetails['YearsOfExpereince']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Country: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['Country']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>City: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['City']}</p>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className='gutter-row' span={12}>
								<p>Nationality: </p>
							</Col>
							<Col className='gutter-row' span={12}>
								<p>{userDetails['Nationality']}</p>
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
				<Link to={`/edit/${submission_id}`}>
					<Button
						type='primary'
						htmlType='button'
						className='sign-form-button'>
						Edit
					</Button>
				</Link>
			</Row>
		</div>
	);
}

export default View;
