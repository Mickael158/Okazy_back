import React, { Fragment , useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const LoginRegister = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const apiUrl = 'https://okazy-production.up.railway.app/authentication/login';
  
  const [username, setUsername] = useState('bobman');
  const [password, setPassword] = useState('123456');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer `,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };
	
    try {
      const response = await fetch(apiUrl, requestOptions);
		
      if (!response.ok) {
        throw new Error('La requête a échoué.');
      }

      const data = await response.json();
      localStorage.removeItem('token');
      localStorage.setItem('token' , data.data);
      console.log('token' ,data);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la requête à l\'API:', error);
    }
  };
  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Login", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper" >
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit}>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={"#"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
