import React, { useState, useEffect } from 'react';
import { Card, Button} from 'antd';
import axios from 'axios'
import '../styles.css'
import { Link , useHistory} from 'react-router-dom'

function List(props) {
	let history = useHistory();
	const [submissionList, setSubmissionList] = useState([])
	const config = {
		headers: {
			Authorization: `Token ${localStorage.getItem('userToken')}`,
			'content-type': 'application/json',
		},
	};

    const createSubmission = () => {
			axios
				.post(`http://127.0.0.1:8000/api/Submission/`, {}, config)
				.then((res) => {
					console.log('res create new submission ', res);
					localStorage.setItem('submissionID', res.data.id);
					setSubmissionList([...submissionList, res.data]);
				})
				.catch((err) => console.log('err create new submission', err));
		};
    useEffect(()=>{
        axios
					.get(`http://127.0.0.1:8000/api/Submission/`, config)
					.then((res) => {
						console.log('res get submission list ', res);
						setSubmissionList(res.data);
					})
					.catch((err) => console.log('error get submission list ', err));
    }, [])

    return (
			<div className='container'>
				{submissionList.length > 0 ? (
					submissionList.map((ele) => (
						<Card
							key={ele.id}
							extra={<Link to={`/View/${ele.id}`}>View</Link>}
							style={{ width: 300 }}>
							<p>{`Submission #${ele.id}`}</p>
						</Card>
					))
				) : (
					<div className='container'>
						<p> no submissions created yet </p>
					</div>
				)}
				<div className='container'>
					<Button
						type='primary'
						htmlType='button'
						className='sign-form-button'
						onClick={createSubmission}>
						New Submission +
					</Button>
				</div>
			</div>
		);
}

export default List;