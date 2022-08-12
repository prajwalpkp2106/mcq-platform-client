import { HourglassOutlined } from "@ant-design/icons";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Col, Radio, Row } from "antd";
import { Card, Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { startLoading, stopLoading } from "../../store/actions";
import { useParams } from "react-router-dom";
import QuestionCard from "../../Components/QuestionCard";

const Solve = (props) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currquestion, setCurrquestion] = useState(0);

  function fetchQuestions() {
    props.registeredEvents?.forEach((element) => {
      if (element.contestId === id) {
        setQuestions(element.questions);
      }
    });
  }

  useEffect(() => {
    props.startLoading("Loading your questions");
    fetchQuestions();
    props.stopLoading();
  }, [props.isAuthenticated, props.registeredEvents]);

  function QuestionPallete() {
    return (
      <div className="grid grid-cols-5 gap-2">
        {questions?.map((ele, index) => {
          return (
            <Button
              onClick={() => setCurrquestion(index)}
              className={`rounded-full hover:bg-yellow-50 hover:border-gray-100 hover:text-black
                
                // current question
                ${
                  currquestion === index
                    ? " bg-yellow-500 "
                    : // solved
                    false
                    ? " bg-green-500 "
                    : // bookmarked
                    false
                    ? " bg-blue-500"
                    : ""
                }
                `}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
    );
  }

  const { sm } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  return (
    <div
      style={{ backgroundColor: "#fff" }}
      className="p-4 md:p-8 space-y-4 min-h-screen select-none"
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
          <QuestionPallete />
          <hr />
          <CommandPalleteDescription />
        </Col>
        <Col span={sm ? 18 : 24} className="space-y-2">
          <div className="text-lg">Question Description</div>
          <QuestionCard details={questions[currquestion]}></QuestionCard>
          <Button
            onClick={() => setCurrquestion(currquestion - 1)}
            disabled={currquestion == 0}
          >
            Prev
          </Button>
          <Button
            disabled={currquestion == questions.length - 1}
            onClick={() => setCurrquestion(currquestion + 1)}
          >
            Next
          </Button>
        </Col>
      </Row>
    </div>
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
  return {
    isAuthenticated: state.isAuthenticated,
    registeredEvents: state.registeredEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startLoading: (message) => dispatch(startLoading(message)),
    stopLoading: () => dispatch(stopLoading()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Solve);
