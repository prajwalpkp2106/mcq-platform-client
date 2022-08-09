import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import "../../App.less";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Col, Grid, Radio, Row, Steps } from "antd";
import { Layout, Card, Button, Space } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import Option from "../../Components/Option";
import Loader from "../../Components/Loader/Loader";
import { getQuestions } from "../../utils/Requests";
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
        <div
          style={{ backgroundColor: "#fff" }}
          className="h-max p-4 md:p-8 space-y-4"
        >
          <div className=" flex justify-between">
            <div className=" flex space-x-4 justify-center items-center text-lg border p-2 rounded">
              <HourglassOutlined />
              <div>30:00:00</div>
            </div>
            <Button className=" border border-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white text-base text-green-500 p-0 px-6 h-auto">
              Submit
            </Button>
          </div>
          <Row gutter={32}>
            <Col span={sm ? 6 : 24} className="space-y-4">
              <div className="text-lg">Question Pallete</div>
              <div className="grid grid-cols-5 gap-2">
                {Array(30)
                  .fill()
                  .map((ele, index) => {
                    return (
                      <Button className=" rounded-full">{index + 1}</Button>
                    );
                  })}
              </div>
              <hr />
              <CommandPalleteDescription />
            </Col>
            <Col span={sm ? 18 : 24} className="space-y-2">
              <div className="text-lg">Question Description</div>
              <Card
                className="m-0 w-full"
                title={`Q${1}. Question Description`}
              >
                <Radio.Group
                  onChange={() => {}}
                  value={1}
                  className="w-full mb-4"
                >
                  <Space direction={"vertical"}>
                    {Array(4)
                      .fill()
                      .map((ele, index) => (
                        <Radio value={index}>Option: {index}</Radio>
                      ))}
                  </Space>
                </Radio.Group>
                <div className=" float-right space-x-2">
                  <Button type={'primary'} className=' bg-sky-500'>Bookmark</Button>
                  <Button danger className=" hover:bg-red-500 hover:text-white">Clear Response</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

const CommandPalleteDescription = () => {
  return (
    <div className="space-y-2">
      <div className="flex space-x-2 items-center">
        <Button className=" bg-sky-500">Q</Button>
        <div>Bookmarked</div>
      </div>
      <div className="flex space-x-2 items-center">
        <Button className=" bg-green-400">Q</Button>
        <div>Attempted</div>
      </div>
      <div className="flex space-x-2 items-center">
        <Button className="">Q</Button>
        <div>Unattempted</div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Solve);
