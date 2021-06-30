import React from 'react';
import { Link } from 'react-router-dom'

function Home(props) {
    return (
			<div>
				Welcome to CV Submission Project please{' '}
				<Link to='/sign-in'>Sign in</Link> or{' '}
				<Link to='/sign-up'>Sign Up </Link> if you're new here.
			</div>
		);
}

export default Home;