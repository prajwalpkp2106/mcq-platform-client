import { Button, Layout, List, Typography } from "antd";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState } from "react";
const { Header, Footer, Sider, Content } = Layout;

const dummyData = [
  "Instruction1Instruction1Instruction1Instruction1Instruction1Instruction1Instruction1Instruction1",
  "Instruction2Instruction2Instruction2Instruction2Instruction2Instruction2Instruction2Instruction2Instruction2",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3"
]

const Instructions = () => {
  const { id } = useParams();
  const [data, setData] = useState(dummyData);
  const [loading, setLoading] = useState(false);
  // useEffect(()=>{
  //     setLoading(true);
  //     getInstructions()
  //     .then((res)=>{
  //         setData(res);
  //         setLoading(false);
  //     })
  //     .catch((error)=>{})

  // },[]);
  return (
    <>
      <Layout
        style={{
          height: "90vh",
          border: "6px solid #190959 ",
          overflow: "auto",
        }}
      >
        <Content style={{ textAlign: "center" }}>
          <h1 className="text-4xl xl:my-4">Instructions</h1>
          <ol style={{ textAlign: "left", fontSize: "1.2rem" }} className = "px-8 xl:px-16 xl:py-4 list-decimal">
            {data.map((ti) => (
              <li className="text-sm xl:my-4">{ti}</li>
            ))}
          </ol>
          <Footer>
            <Link to="/:id/solve">
              <Button type="primary" size="large">
                Next
              </Button>
            </Link>
          </Footer>
        </Content>
      </Layout>
    </>
  );
};

export default Instructions;
