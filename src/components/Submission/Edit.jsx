import React from 'react';
import Attachment from './EditComponents/Attachment';
import Education from './EditComponents/Education';
import ProfileEdit from './EditComponents/ProfileEdit';
import { Button, Collapse } from 'antd';

function Edit(props) {
	const { Panel } = Collapse;

	const handleSaveCV = () => {};
	return (
		<div>
			<Collapse defaultActiveKey={['1']}>
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

			<Button onClick={handleSaveCV}>Save</Button>
		</div>
	);
}

export default Edit;
