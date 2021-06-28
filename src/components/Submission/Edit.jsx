import React from 'react';
import Attachment from './EditComponents/Attachment';
import Education from './EditComponents/Education';
import ProfileEdit from './EditComponents/ProfileEdit';

function Edit(props) {
    return (
        <div>
            <ProfileEdit />
            <Education />
            <Attachment />
        </div>
    );
}

export default Edit;