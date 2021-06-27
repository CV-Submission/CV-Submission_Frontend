import React, { useState } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Submission/Profile';
import Education from './components/Submission/Education';
import Attachment from './components/Submission/Attachment';
import { Menu, Layout } from 'antd';

const { Header, Content, Footer } = Layout;

function App() {
	const [currentPage, setCurrentPage] = useState('mail');

	const handleClick = (e) => {
		console.log('click ', e);
		setCurrentPage(e.key);
	};

	return (
		<Layout>
			<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
				<div className='logo' />
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={['2']}
					onClick={handleClick}
					selectedKeys={[currentPage]}>
					<Menu.Item key='home-page'>Home page</Menu.Item>
					<Menu.Item key='sign-in'>Sign in</Menu.Item>
					<Menu.Item key='sign-up'>Sign Up</Menu.Item>
					<Menu.Item key='logout' style={{ float: 'right' }}>
						Log out
					</Menu.Item>
				</Menu>
			</Header>
			{/* Nav bar >>>(Home page)Application view page, &&& sign in buttone, &&& sign up button, &&& log out button (only if logged in/signed in ) 
			- welcome screen, sign in, sign up links 
			
			new user: home/or logo ____ signin signup butttons
			loggedin user: 
			*/}
			<Content
				className='site-layout'
				style={{ padding: '0 50px', marginTop: 64 }}>
				<div
					className='site-layout-background'
					style={{ padding: 24, minHeight: 380 }}>
					{/* Router */}

					<SignIn />
					<SignUp />
					<Profile />
					<Education />
					<Attachment />
				</div>
			</Content>

			<Footer style={{ textAlign: 'center' }}>
				Designed and Developed by Haneen Alghamdi & Raghad Abu-Mansour
			</Footer>
			{/* Footer. >>> by haneen & raghad &&& github repo link &&& social media links */}
		</Layout>
	);
}

export default App;
