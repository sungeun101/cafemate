import '../styles/Topbar.css'
import React from 'react';
import { Avatar, Typography, Popover, List, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import dotenv from "dotenv";
import {withRouter} from 'react-router-dom';

dotenv.config()
const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY

const {Title} = Typography;

function Topbar(props) {
    const { setGoogleId, setGoogleName, setGoogleImg } = props
    const { googleId, googleName, googleImg } = props.userInfo

    const loginSuccess = (res) => {
        console.log("Login success!")
        setGoogleId(res.googleId)
        setGoogleName(res.profileObj.givenName)
        setGoogleImg(res.profileObj.imageUrl)
    }
    const loginFailure = (res) => {
        console.log("Failed to log in.")
    }

    const logoutSuccess = (res) => {
        console.log("Logout success!")
        setGoogleId(null)
        props.history.push('/')
    }
    const logoutFailure = (res) => {
        console.log("Failed to log out.")
    }

    const loginPopover = (
        <List>
        <GoogleLogin
            clientId={GOOGLE_KEY}
            responseType={"id.token"}
            onSuccess={loginSuccess}
            onFailure={loginFailure}
            render={renderProps => (
                <List.Item onClick={renderProps.onClick}>
                    <Button>Sign in with Google</Button>
                </List.Item>
            )}
        />
        </List>
    )

    const logoutPopover = (
        <List>
            <List.Item>
                <Button onClick={() => props.history.push("/my")}>My page</Button>
            </List.Item>
            <GoogleLogout
                clientId={GOOGLE_KEY}
                onLogoutSuccess={logoutSuccess}
                onFailure={logoutFailure}
                buttonText="Logout"
                render={renderProps => (
                    <List.Item onClick={renderProps.onClick}>
                        <Button>Log out</Button>
                    </List.Item>
                )}
            />
        </List>
    )

    return (
        <div className="topbar">
            <Title level={2} onClick={() => props.history.push("/")}>CAFEMATE</Title>
            <div className="user">
            {googleId?
                <>
                <span id="userName">{googleName}</span>
                <Popover placement="bottomRight" content={logoutPopover}>
                    <Avatar src={googleImg} />
                </Popover>
                </>
                :
                <>
                <Popover placement="bottomRight" content={loginPopover}>
                    <Avatar size="small" icon={<UserOutlined />} />
                </Popover>
                </>
            }
            </div>
        </div>
    )
}

export default withRouter(Topbar);