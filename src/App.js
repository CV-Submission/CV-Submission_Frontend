import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Menu, Layout, Button } from 'antd';
import View from './components/Submission/View';
import Edit from './components/Submission/Edit';
import List from './components/Submission/List';
import Home from './components/Home';
import axios from 'axios'
import AuthRoute from './AuthRoute'

const { Header, Content, Footer } = Layout;

function App() {
	const [currentPage, setCurrentPage] = useState('home-page');
	let history = useHistory()

	const handleClick = (e) => {
		// console.log('click ', e);
		setCurrentPage(e.key);
	};
	const logout = () => {

		const config = {
			headers: {
				Authorization: `Token ${localStorage.getItem('userToken')}`,
			},
		};
		axios
			.post(`http://127.0.0.1:8000/api-token-auth/logout`, config)
			.then((res) => console.log('logout res ', res))
			.catch((err) => console.log('logout error ', err));
		localStorage.clear() 
		history.push('/')
	}

	return (
		<Layout>
			<Router>
				<Header style={{ position: 'fixed', zIndex: 1, width: '100%', marginBottom: '6%' }}>
					<div className='logo' />

					<Menu
						theme='dark'
						mode='horizontal'
						defaultSelectedKeys={['2']}
						onClick={handleClick}
						selectedKeys={[currentPage]}>
						{localStorage.getItem('userToken') ? (
							<Menu.Item key='submissions'>
								<Link to='/submissions'>Submissions</Link>
							</Menu.Item>
						) : (
							<Menu.Item key='home-page'>
								<Link to='/'>Home page</Link>
							</Menu.Item>
						)}
					</Menu>
				</Header>
				{localStorage.getItem('userToken') ? (
					<Button
						style={{ float: 'right', marginTop: '6%', width: '200px' }}
						onClick={logout}>
						Logout
					</Button>
				) : null}
				<Content
					// className='site-layout'
					style={{ padding: '2%', margin: '12% 4% 12% 4%', height: '100vh'}}>
					<div
						// className='site-layout-background'
						style={{ padding: '1%', minHeight: 380, height: '100vh' }}>
						<Switch>
							<Route exact path='/' render={() => <Home />} />
							<Route exact path='/sign-up' render={() => <SignUp />} />
							<Route exact path='/sign-in' render={() => <SignIn />} />
							<AuthRoute exact path='/view/:submission_id'>
								<View />
							</AuthRoute>
							<AuthRoute exact path='/edit/:submission_id'>
								<Edit />
							</AuthRoute>
							<AuthRoute exact path='/submissions'>
								<List />
							</AuthRoute>
						</Switch>
					</div>
				</Content>

				<Footer
					style={{
						textAlign: 'center',
						position: 'fixed',
						left: '0',
						bottom: '0',
						height: '70px',
						width: '100%',
						borderTop: '1px solid #E7E7E7',
						marginTop: '20%',
					}}>
					Designed and Developed by Haneen Alghamdi & Raghad Abu-Mansour
				</Footer>
			</Router>
		</Layout>
	);
}

export default App;
