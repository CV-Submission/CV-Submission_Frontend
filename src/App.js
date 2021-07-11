import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Menu, Layout, Button } from "antd";
import View from "./components/Submission/View";
import Edit from "./components/Submission/Edit";
import List from "./components/Submission/List";
import Home from "./components/Home";
import axios from "axios";
import AuthRoute from "./AuthRoute";

const { Header, Content, Footer } = Layout;

function App() {
  const [currentPage, setCurrentPage] = useState("home-page");
  let history = useHistory();

  const handleClick = (e) => {
    // console.log('click ', e);
    setCurrentPage(e.key);
  };
  const logout = () => {
    const config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
    };
    axios
      .post(`http://127.0.0.1:8000/api-token-auth/logout`, config)
      .then((res) => console.log("logout res ", res))
      .catch((err) => console.log("logout error ", err));
    localStorage.clear();
    history.push("/");
  };

  return (
    <Layout>
      <Router>
	  <div class="curved-div">
      {/* <h1>We Maintain, We Care</h1> */}
      {/* <p>
        Welcome to MainToU, your first place when a tech issue occured! 
      </p> */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#fff"
          fill-opacity="1"
          d="M0,96L48,85.3C96,75,192,53,288,85.3C384,117,480,203,576,229.3C672,256,768,224,864,181.3C960,139,1056,85,1152,96C1248,107,1344,181,1392,218.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            marginBottom: "6%",
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            onClick={handleClick}
            selectedKeys={[currentPage]}
          >
            {localStorage.getItem("userToken") ? (
              <Menu.Item key="submissions">
                <Link to="/submissions">Submissions</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="home-page">
                <Link to="/">Home page</Link>
              </Menu.Item>
            )}
            {localStorage.getItem("userToken") ? (
              <Menu.Item
                style={{ float: "right",  width: "90px" }}
                onClick={logout}
              >
                Logout
              </Menu.Item>
            ) : null}
          </Menu>
        </Header>

        <Content
          // className='site-layout'
          style={{ padding: "0%", margin: "0% 4% 12% 4%", height: "100vh" }}
        >
          <div
            // className='site-layout-background'
            style={{ padding: "0%", minHeight: 380, height: "100vh" }}
          >
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/sign-up" render={() => <SignUp />} />
              <Route exact path="/sign-in" render={() => <SignIn />} />
              <AuthRoute exact path="/view/:submission_id">
                <View />
              </AuthRoute>
              <AuthRoute exact path="/edit/:submission_id">
                <Edit />
              </AuthRoute>
              <AuthRoute exact path="/submissions">
                <List />
              </AuthRoute>
            </Switch>
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "70px",
            width: "100%",
            borderTop: "1px solid #E7E7E7",
            marginTop: "20%",
          }}
        >
          Designed and Developed by Haneen Alghamdi & Raghad Abu-Mansour
        </Footer>
      </Router>
    </Layout>
  );
}

export default App;
