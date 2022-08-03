import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    IssuesCloseOutlined,
    RightCircleOutlined,
    HourglassOutlined
  } from '@ant-design/icons';
import '../../App.less';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { Steps } from 'antd';
import { Layout, Menu,Radio, Card,Row,Col,Button, Space } from 'antd';
import React, { useState } from 'react';
import Option from "../../Components/Option"
import userMenu from "../../Components/Menu/Menu";
const { Header, Sider, Content } = Layout;
const { Step } = Steps;
const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};
var que ={
  number:"1",
  statment:  "Which of the following can be considered as the correct syntax for declaring an array  of pointers of integers that has a size of 10 in C++ ?",
  option_1:"optionn 1",
  option_2:"option 2",
  option_3:"option 3",
  option_4:"option 4"
}
const Questions = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {sm} = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
 
  const qstyle = {
    backgroundColor:"grey",
    margin:"24px",
    borderRight:"1px solid white",
    borderLeft:"1px solid white" ,
  };
  const mobstyle = {
 
    margin:"10px",
    borderRight:"1px solid white",
    borderLeft:"1px solid white" ,
    marginTop:"24px",
    paddigleft:"4px"
  };
  const onChange = (e: RadioChangeEvent) => {
      console.log(`radio checked:${e.target.value}`);
    };
    
  return (
  <div style={{backgroundColor:"#fff"}}>
  <div style={{margin:"10px",fontSize:"20px"}}>  <HourglassOutlined spin="true" style={{color:"black",fontSize:"30px",marginLeft:"10px",alignSelf:"center"}} /> 30:00:00 <Button type="primary" style={{float:"right",marginRight:"20px"}}>Submit</Button></div>
    <Layout style={{height:"100vh",border:"2px solid ",borderTop:"0px",overflow:"auto",backgroundColor:"#fff"}}> 
      <Layout className="site-layout">  
        <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          marginTop:sm?"24px":"16px",
          padding: 24,
          minHeight: 280,  
        }}
      >
          <div style={{margin:'2px',fontSize:"1.1rem", fontWeight:"bold", borderBottom:"2px solid black"}}>  Question {que.number} : </div>
          <div  style={{margin:'2px',marginBottom:"10px",fontSize:"1.1rem", fontWeight:"normal"}}> {que.statment}</div>
          <div> 
              <Option />
              <Option />
              <Option />
              <Option />
          </div>
          <div>    {/* <Button type="primary" size={'large'}> Bookmark </Button>
          <Button type="primary" size={'large'}> Save and Next </Button> */}
      
           <Card  bodyStyle={{padding:"0px",margin:"0px",width:"100%",border:"0px solid white"}}>
              <Button type="primary" size={'large'} style={{margin:"10px"}}  > Bookmark </Button>
              <Button type="primary" size={'large'}> Save and Next </Button>
          </Card>
          </div>
          
        </Content>
      
      {sm ?
      <>
         <Header
         className="site-layout-background"
         style={{
           padding: 0,
           alignSelf:'center',
           backgroundColor:'white' ,
           fontSize:"20px"
         }}
       >
      
         {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
           className: 'trigger',
           onClick: () => setCollapsed(!collapsed),
         })}
       </Header>
       <Sider trigger={null} collapsible collapsed={collapsed} width={sm? "500" :"250"} collapsedWidth={0}  style={qstyle} >
       <Space size={[8, 16]} wrap>
       
    {new Array(20).fill(null).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <CheckCircleOutlined style={{color:"white",fontSize:"45px",margin:"15px",cursor:"pointer"}}  key={index}> {index}</ CheckCircleOutlined>
     
    ))}
     <InfoCircleOutlined style={{color:"white",fontSize:"45px",margin:"15px"}} />
     <IssuesCloseOutlined style={{color:"white",fontSize:"45px",margin:"15px"}} />
  </Space>
        
        </Sider>
      </>
      : <>
          <Header
          className="site-layout-background"
          style={{
            padding: 0,
            alignSelf:'center',
            backgroundColor:'white',
            width:"1px",
            margin:"0px",
            fontSize:"20px",
            
          }} >   
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          </Header>
          <Sider trigger={null} collapsible collapsed={collapsed} width={50} collapsedWidth={0}  style={mobstyle} >
 
            <Steps direction="vertical" size="default" current={0} style={{overflow:"auto",height:"100%",alignContent:"center",paddingLeft:"8px"}}>
                <Step title="Step 1" status="process"/>
                <Step title="step 2" status="finish" />
                <Step title="step 3" status="wait" />
                <Step title="Step 1" status="process" />
                <Step title="step 2" status="finish" />
                <Step title="step 3" status="wait" /> 
                <Step title="Step 1" status="process" />
                <Step title="step 2" status="finish" />
                <Step title="step 3" status="wait" />  
                <Step title="Step 1" status="process" />
                <Step title="step 2" status="finish" />
                <Step title="step 3" status="wait" />
                <Step title="Step 1" status="process" />
                <Step title="step 2" status="finish" />
                <Step title="step 3" status="wait" />  
                <Step title="Step 1" status="process" />
                <Step title="step 2" status="finish" />
                <Step title="step 3" status="wait" />
            </Steps>
          </Sider>
        </>
      }
    </Layout>
  </Layout>
</div>
  );
};
export default Questions

