import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import "../../App.less";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Steps } from "antd";
import { Layout, Card, Button, Space } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import Option from "../../Components/Option";
import Loader from "../../Components/Loader/Loader";
import { getQuestions } from "../../api/Requests";
const { Header, Sider, Content } = Layout;
const { Step } = Steps;

var que = [
  {
    number: "1",
    statment:
      "Which of the following can be considered as the correct syntax for declaring an array  of pointers of integers that has a size of 10 in C++ ?",
    options: ["option 1", "option 2", "option 3", "opttion 4"],
  },
  {
    number: "2",
    statment: "Which of the following can be considered as the c?",
    options: ["cpp", "java", "node", "python"],
  },
];

const Solve = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currquestion, setCurrquestion] = useState(0);
  let permit = false;
  // useEffect(()=>{
  //     setLoading(true);
  //     getQuestions()
  //     .then((res)=>{
  //         setQuestions(res);
  //         setLoading(false);
  //     })
  //     .catch((error)=>{})

  // },[]);
  function optionClicked(question) {
    console.log("option chooses send ");
  }
  const Bookmarked = () => {
    // set bookmarked state of que to true;
  };
  const savenext = () => {
    //send request to backend to save current que ans and the  next
    setCurrquestion(currquestion + 1);
  };

  const { sm } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  return (
    <>
      {loading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
        <div style={{ backgroundColor: "#fff" }}>
          <div
            style={{
              margin: sm ? "10px" : "5px",
              fontSize: sm ? "30px" : "15px",
              padding: "5px",
            }}
          >
            <HourglassOutlined
              spin="true"
              style={{
                color: "black",
                fontSize: sm ? "30px" : "15px",
                marginLeft: sm ? "10px" : "4px",
                alignSelf: "center",
              }}
            />
            30:00:00
            <Button
              type="primary"
              style={{
                float: "right",
                backgroundColor: "red",
                alignSelf: "center",
              }}
              size={sm ? "large" : "small"}
            >
              Submit
            </Button>
          </div>
          <Layout
            style={{
              height: "100vh",
              border: "2px solid ",
              borderTop: "0px",
              overflow: "auto",
              backgroundColor: "#fff",
            }}
          >
            <Layout className="site-layout">
              <Content
                className="site-layout-background"
                style={{
                  margin: "24px 16px",
                  marginTop: sm ? "24px" : "16px",
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <div
                  style={{
                    margin: "2px",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    borderBottom: "2px solid black",
                  }}
                >
                  Question {currquestion + 1} :
                </div>
                <div
                  style={{
                    margin: "2px",
                    marginBottom: "10px",
                    fontSize: "1.1rem",
                    fontWeight: "normal",
                  }}
                >
                  {que[currquestion].statment}
                </div>
                {que[currquestion].options.map((opt, optindx) => (
                  <div onClick={optionClicked}>
                    <Option optionstatement={{ opt, optindx }} />
                  </div>
                ))}
                <div>
                  <Card
                    bodyStyle={{
                      padding: "0px",
                      margin: "0px",
                      width: "100%",
                      border: "0px solid white",
                      backgroundColor: "#f0f2f5",
                    }}
                  >
                    <Button
                      type="primary"
                      size={"large"}
                      style={{ margin: "10px", backgroundColor: "#3b82f6 " }}
                    >
                      Bookmark
                    </Button>
                    <Button
                      type="primary"
                      size={"large"}
                      disabled={currquestion < que.length - 1 ? false : true}
                      style={{ backgroundColor: "#3b82f6 " }}
                      onClick={savenext}
                    >
                      Save and Next
                    </Button>
                  </Card>
                </div>
              </Content>
              {sm ? (
                <>
                  <Header
                    className="site-layout-background"
                    style={{
                      padding: 0,
                      alignSelf: "center",
                      backgroundColor: "white",
                      fontSize: "20px",
                    }}
                  >
                    {React.createElement(
                      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                      {
                        className: "trigger",
                        onClick: () => setCollapsed(!collapsed),
                      }
                    )}
                  </Header>
                  <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={sm ? "500" : "250"}
                    collapsedWidth={0}
                    style={{
                      backgroundColor: "white",
                      margin: "24px",
                      borderRight: "1px solid white",
                      borderLeft: "1px solid grey",
                      boxShadow: "inset 2px 3px grey",
                    }}
                  >
                    <Space size={[8, 16]} wrap style={{ paddingTop: "8px" }}>
                      {que.map((_, index) => (
                        <Button
                          shape="circle"
                          size="large"
                          style={{
                            margin: "12px",
                            color: "black",
                            padding: "1px",
                            borderColor: "gray",
                            backgroundColor: "#99f6e4",
                          }}
                          onClick={() => setCurrquestion(index)}
                        >
                          {index + 1}
                        </Button>
                      ))}
                      <Button
                        shape="circle"
                        size="large"
                        style={{
                          margin: "12px",
                          color: "black",
                          padding: "1px",
                          borderColor: "grey",
                          backgroundColor: "blue",
                        }}
                      >
                        21
                      </Button>
                      <Button
                        shape="circle"
                        size="large"
                        style={{
                          margin: "12px",
                          color: "black",
                          padding: "1px",
                          borderColor: "green",
                          backgroundColor: "green",
                        }}
                      >
                        22
                      </Button>
                    </Space>
                  </Sider>
                </>
              ) : (
                <>
                  <Header
                    className="site-layout-background"
                    style={{
                      padding: 0,
                      alignSelf: "center",
                      backgroundColor: "white",
                      width: "1px",
                      margin: "0px",
                      fontSize: "20px",
                    }}
                  >
                    {React.createElement(
                      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                      {
                        className: "trigger",
                        onClick: () => setCollapsed(!collapsed),
                      }
                    )}
                  </Header>
                  <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={50}
                    collapsedWidth={0}
                    style={{
                      margin: "10px",
                      borderRight: "0.5px slid white",
                      borderLeft: "0.5px solid white",
                      paddingLeft: "4px",
                      overflow: "auto",
                      height: "100vh",
                      backgroundColor: "white",
                      boxShadow: "inset 0.5px 1px grey",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                      }}
                    >
                      {que.map((_, index) => (
                        <Button
                          shape="circle"
                          size="large"
                          style={{
                            margin: "8px 2px 8px 2px",
                            color: "black",
                            padding: "1px",
                            borderColor: "gray",
                            backgroundColor: "#99f6e4",
                          }}
                          onClick={() => setCurrquestion(index)}
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </div>
                  </Sider>
                </>
              )}
            </Layout>
          </Layout>
        </div>
      )}
    </>
  );
};
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Solve);
