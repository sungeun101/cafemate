import '../styles/Topbar.css';
import React from 'react';
import { Avatar, Typography, Popover, List, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import dotenv from 'dotenv';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

dotenv.config();
const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY;

const { Title } = Typography;

function Topbar(props) {
  const { setGoogleId, setGoogleName, setGoogleImg } = props;
  const { googleId, googleName, googleImg } = props.userInfo;

  const loginSuccess = (res) => {
    const id = res.googleId;
    const { givenName, imageUrl, email } = res.profileObj;
    window.localStorage.setItem('googleId', id);
    window.localStorage.setItem('googleName', givenName);
    window.localStorage.setItem('googleImg', imageUrl);
    window.localStorage.setItem('googleEmail', email);
    setGoogleId(id);
    setGoogleName(givenName);
    setGoogleImg(imageUrl);

    axios
      .get(`/users/${id}`)
      .then((res) => {
        console.log('Login success!');
      })
      .catch((e) => {
        // 없는 아이디일 경우
        axios
          .post('/users', {
            id: id,
            name: givenName,
            email: email,
            img_path: imageUrl,
          })
          .then((res) => {
            console.log('Login success!');
          })
          .catch((e) => {
            console.log(e);
          });
      });
  };
  const loginFailure = (res) => {
    console.log('Failed to log in.');
  };

  const logoutSuccess = () => {
    window.localStorage.removeItem('googleId');
    window.localStorage.removeItem('googleName');
    window.localStorage.removeItem('googleImg');
    window.localStorage.removeItem('googleEmail');
    setGoogleId(null);
    setGoogleName(null);
    setGoogleImg(null);
    props.history.push('/');
  };
  const logoutFailure = (res) => {
    console.log('Failed to log out.');
  };

  const loginPopover = (
    <List>
      <GoogleLogin
        clientId={GOOGLE_KEY}
        responseType={'id.token'}
        onSuccess={loginSuccess}
        onFailure={loginFailure}
        render={(renderProps) => (
          <List.Item onClick={() => renderProps.onClick()}>
            <Button className="blackButton">Sign in with Google</Button>
          </List.Item>
        )}
      />
    </List>
  );

  const logoutPopover = (
    <List>
      <List.Item>
        <Button
          className="blackButton"
          onClick={() => props.history.push('/my')}
        >
          My page
        </Button>
      </List.Item>
      <GoogleLogout
        clientId={GOOGLE_KEY}
        onLogoutSuccess={logoutSuccess}
        onFailure={logoutFailure}
        buttonText="Logout"
        render={(renderProps) => (
          <List.Item onClick={() => renderProps.onClick()}>
            <Button className="blackButton">Log out</Button>
          </List.Item>
        )}
      />
    </List>
  );

  return (
    <div className="topbar">
      <Title level={2} onClick={() => props.history.push('/')}>
        CAFEMATE
      </Title>
      <div className="user">
        {googleId ? (
          <>
            <Popover placement="bottomRight" content={logoutPopover}>
              <Avatar size="small" src={googleImg} />
            </Popover>
          </>
        ) : (
          <>
            <Popover placement="bottomRight" content={loginPopover}>
              <Avatar size="small" icon={<UserOutlined />} />
            </Popover>
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(Topbar);
