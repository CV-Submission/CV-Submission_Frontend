import React from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom'
import './styles.css'

function Home(props) {
		return (
			<div>
				{localStorage.getItem('userToken') ? (
					<Redirect to='/submissions' />
				) : (
					<div className='welcome'>
						<div className='site-img' />
						<h3>
							Welcome to CV Submission. Please{' '}
							<Link to='/sign-in'>Sign in</Link> or{' '}
							<Link to='/sign-up'>Sign Up! </Link> if you're new here.
						</h3>
					</div>
				)}
			</div>
		);
}

export default Home;