import './Topbar.css'
import React from 'react';
import { Link } from 'react-router-dom'
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const {Title} = Typography;

class Topbar extends React.Component {
    render(){
        return (
            <div className="topbar">
                <Link to='/'><Title level={2}>CAFEMATE</Title></Link>
                <div className="user">
                    <Avatar size="small" icon={<UserOutlined />} />
                </div>
            </div>
        )
    }
}

export default Topbar