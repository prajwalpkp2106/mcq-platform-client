import { Button, Layout ,List,Typography } from 'antd';
import {Link } from "react-router-dom"
import { useParams } from 'react-router';
const { Header, Footer, Sider, Content } = Layout;

const data = [
 
  ];
  
const Instructions = () =>{
  const { id } = useParams();
  return (

  <>
    <Layout style={{height:"90vh",border:"6px solid #190959 ",overflow:"auto"}}>
        <Content style={{textAlign:"center"}}>
            <h1>Instructions</h1>
            <ol style={{textAlign:"left",fontSize:"1.2rem"}}>
            {data.map((ti) => (
               <li>{ti}</li>
          )
            )}
            </ol>
         <Footer>
         <Link to="/questions">
         <Button type="primary" size="large">next</Button>
        </Link></Footer>   
        </Content>
     
      
    </Layout>

  </>
)
};

export default Instructions