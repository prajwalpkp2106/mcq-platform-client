import { Button, Card, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bookmarkOrAttempt } from "../store/actions";
import { getQuestionById } from "../utils/Requests";

function QuestionCard({ details, ...props }) {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [attempted, setAttempted] = useState(null);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    details?.questionId &&
      getQuestionById(details.questionId).then(
        ({ data: { success, data, error } }) => {
          if (success) setQuestion(data);
        }
      );
  }, [details]);

  function clearResponse() {
    setAttempted(null);
    bookmarkOrAttempt(null, bookmark);
  }

  function bookmarkOrAttempt(attempted, bookmark) {
    props.bookmarkOrAttempt({
      questionId: details.questionId,
      contestId: id,
      attempted,
      bookmark,
    });
  }

  return (
    <Card className="m-0 w-full" title={`Q${1}. ${question.title}`}>
      <Radio.Group
        onChange={(event) => {
          setAttempted(event.target.value);
          bookmarkOrAttempt(event.target.value, bookmark);
        }}
        value={attempted}
        className="w-full mb-4"
      >
        <Space direction={"vertical"}>
          {question?.options?.map((ele, index) => (
            <Radio value={ele}>{ele}</Radio>
          ))}
        </Space>
      </Radio.Group>
      <div className=" float-right space-x-2">
        <Button
          onClick={() => {
            setBookmark((initial) => {
              bookmarkOrAttempt(attempted, !initial);
              return !initial;
            });
          }}
          type={"primary"}
          className=" bg-sky-500"
        >
          {bookmark && "Remove "}Bookmark
        </Button>
        <Button
          onClick={clearResponse}
          danger
          className=" hover:bg-red-500 hover:text-white"
        >
          Clear Response
        </Button>
      </div>
    </Card>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    bookmarkOrAttempt: (details) => {
      dispatch(bookmarkOrAttempt(details));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
