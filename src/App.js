import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Menu, Layout } from 'antd';
import View from './components/Submission/View';
import Edit from './components/Submission/Edit';
import Home from './components/Home';

const { Header, Content, Footer } = Layout;

function App() {
	const [currentPage, setCurrentPage] = useState('home-page');

	const handleClick = (e) => {
		console.log('click ', e);
		setCurrentPage(e.key);
	};

	return (
		<Layout>
			<Router>
				<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					<div className='logo' />

					<Menu
						theme='dark'
						mode='horizontal'
						defaultSelectedKeys={['2']}
						onClick={handleClick}
						selectedKeys={[currentPage]}>
						<Menu.Item key='home-page'>
							<Link to='/'>Home page</Link>
						</Menu.Item>

						<Menu.Item key='sign-in'>
							<Link to='/sign-in'>Sign in</Link>
						</Menu.Item>

						<Menu.Item key='logout' style={{ float: 'right' }}>
							Log out
						</Menu.Item>
					</Menu>
				</Header>
				<Content
					className='site-layout'
					style={{ padding: '0 50px', marginTop: 64 }}>
					<div
						className='site-layout-background'
						style={{ padding: 24, minHeight: 380 }}>
						{/* Router */}

						<Switch>
							<Route exact path='/' render={() => <Home />} />
							<Route exact path='/sign-up' render={() => <SignUp />} />
							<Route exact path='/sign-in' render={() => <SignIn />} />
							{/* <Route exact path='/:userName' render={() => <View />} /> */}
							{/* <Route exact path='/:userName/edit' render={() => <Edit />} /> */}
						</Switch>

						{/* <SignIn /> */}
						{/* <SignUp /> */}
						{/* <View /> */}
						{/* <Edit /> */}
					</div>
				</Content>

				<Footer style={{ textAlign: 'center' }}>
					Designed and Developed by Haneen Alghamdi & Raghad Abu-Mansour
				</Footer>
			</Router>
		</Layout>
	);
}

export default App;
