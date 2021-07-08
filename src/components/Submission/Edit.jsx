import React from 'react';
import Attachment from './EditComponents/Attachment';
import Education from './EditComponents/Education';
import ProfileEdit from './EditComponents/ProfileEdit';
import { Button, Collapse } from 'antd';
import '../styles.css';
import { Redirect, useParams, useHistory } from 'react-router-dom';

function Edit(props) {
	const { Panel } = Collapse;
	let history = useHistory();
	

	const { submission_id } = useParams()
	const handleSaveSubmission = () => {
		history.push(`/view/${submission_id}`)
		// <Redirect to={`/view/${submission_id}`} />;
	};
	
	return (
		<div>
			<Collapse className='edit-page' defaultActiveKey={['1']}>
				<Panel header='General Details' key='1'>
					<ProfileEdit />
				</Panel>
				<Panel header='Education' key='2'>
					<Education />
				</Panel>
				<Panel header='Attachment' key='3'>
					<Attachment />
				</Panel>
			</Collapse>

			<Button onClick={handleSaveSubmission}>Save</Button>
		</div>
	);
}

export default Edit;
