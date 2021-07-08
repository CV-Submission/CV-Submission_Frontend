import React from 'react';
import { Route, Redirect } from 'react-router-dom'

function AuthRoute({ children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return localStorage.getItem('userToken') ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/sign-in',
							// state: { from: location },
						}}
					/>
				);
			}}
		/>
	);
}

export default AuthRoute;
