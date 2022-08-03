import { AppstoreOutlined, MailOutlined, SettingOutlined,UserOutlined,DownOutlined } from '@ant-design/icons';
import { Menu ,Avatar, Image,Dropdown, message, Space} from 'antd';
import { Link } from 'react-router-dom';
import styles from './Header.css'
import userMenu from "../Menu/Menu"
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
const menu = (
  <Menu
    onClick={onClick}
    items={[
      {
        label: 'Profile',
        key: '1',
      },
      {
        label: 'Log out',
        key: '2',
      },
     
    ]}
  />
);
const Header = () => (
  <>
  </>
  // <Menu mode="horizontal" defaultSelectedKeys={['Instruction']} style={{border:"2px solid #190959",fontSize:"1.2rem"}}>
  //    <Link to="/">
  //    <Menu.Item key="Intstruction" >
  //     Instructions
  //   </Menu.Item>
  //       </Link>
  //       <Link to="/questions">
  //       <Menu.Item key="Questions" >
  //     Questions
  //   </Menu.Item>
  //       </Link>
    
    
  //   <Menu.Item key="user" style={{float:'right', marginLeft: 'auto'}} >
  //   {/* <UserOutlined style={{fontSize:"25px"}}/> */}
  //   <Dropdown overlay={menu}>
  //   {/* <a onClick={(e) => e.preventDefault()}> */}
  //     <Space>
  //       <Avatar  onClick={(e) => e.preventDefault()} style={{ backgroundColor: '#87d068',marginRight:"10px" }} icon={<UserOutlined />} >
     
  //     </Avatar>
        
  //     </Space>
  //   {/* </a> */}
  // </Dropdown>
   

  //   </Menu.Item>

   
  // </Menu>
);

export default Header;