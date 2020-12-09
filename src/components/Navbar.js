import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {  Layout, Menu, Typography } from 'antd';
import { 
    TrophyOutlined,
    BarsOutlined,
    NotificationOutlined,
    TableOutlined,
    InfoCircleOutlined,
    UserOutlined,
    SendOutlined
} from '@ant-design/icons'
import './../index.css'
import logo from './../assets/images/brand/logo.png'
import Signup from './../containers/user/Signup.js'

const { Sider } = Layout;
const { Title, Text, Link : L } = Typography;
const SubMenu = Menu.SubMenu;

const Navbar = () => {
    
    const style = {
        marginRight: 10,
        color: 'black'
    }

    const role = localStorage.getItem('role')

    const [collapsed, setCollapsed] = useState(1);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={()=>{setCollapsed(!collapsed)}}>
            <div className="logo" >
                <L href="/" target="_blank">
                    <img src={logo} className="logoImg"/>
                </L>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['/']}
         mode="inline" selectedKeys={[ window.location.pathname ]}> 
                <Menu.Item key="/" icon={<BarsOutlined />}>
                    <L href="/" className="nav-text">Главная</L>
                </Menu.Item>
                { role != 'BAD' && role != 'USER' ? <>
                <Menu.Item key="10" icon={<TableOutlined />}>
                    <L href="/producers" className="nav-text">Список поставщиков</L>
                </Menu.Item>
                <Menu.Item key="10" icon={<TableOutlined />}>
                    <L href="/producers" className="nav-text">Список закупок</L>
                </Menu.Item>
                <Menu.Item icon={<SendOutlined />}>
                    <L href="/requests" className="nav-text">Заявки</L>
                </Menu.Item>
                </> : <></> 
                }
                { role === "ADMIN" ? <>
                <Menu.Item key="10" icon={<TableOutlined />}>
                    <L href="/producers" className="nav-text">Список сотрудников</L>
                </Menu.Item>
                <Menu.Item key="10" icon={<TableOutlined />}>
                    <L href="/producers" className="nav-text">Создать сотрудника</L>
                </Menu.Item>
                <Menu.Item key="10" icon={<TableOutlined />}>
                    <L href="/producers" className="nav-text">Черный список</L>
                </Menu.Item>
                <Menu.Item key="10" icon={<TableOutlined />}>
                    <L href="/producers" className="nav-text">Логирование</L>
                </Menu.Item>
                </> : <></>
                }
                
                <SubMenu key="sub1" icon={<UserOutlined />} title="Личный кабинет">
                    
                    { localStorage.getItem("user") ? <>
                    <Menu.Item key="5">
                        <L href="/logout" className="nav-text"
                        onClick={() => {
                            localStorage.removeItem('user');
                            localStorage.removeItem('role');
                        }}
                        >Выйти</L>
                    </Menu.Item> 
                    <Menu.Item key="3">
                        <L href="/edit-profile" className="nav-text">Редактирвоать профиль</L>
                    </Menu.Item>
                    </> : <>
                    <Menu.Item key="3">
                        <Signup />
                    </Menu.Item></>
                    }
                </SubMenu>
                <SubMenu key="sub2" icon={<InfoCircleOutlined />} title="О нас">
                    <Menu.Item key="6">
                        <L href="/about" className="nav-text">О нас</L>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <L href="/about" className="nav-text">О нас</L>
                    </Menu.Item>
                    <Menu.Item key="9">
                        <L href="/contact" className="nav-text">Контакты</L>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
    
}



export default Navbar