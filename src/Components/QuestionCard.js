import { Button, Card, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { bookmarkOrAttempt } from "../store/actions";
import { Requests } from "../utils";
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
    props.registeredEvents.forEach((event) => {
      if (event.contestId == id) {
        event.questions.forEach((que) => {
          if (que.questionId === details?.questionId) {
            setBookmark(que.bookmark);
            setAttempted(que.attempted);
          }
        });
      }
    });
  }, [details]);

  function clearResponse() {
    setAttempted(null);
    bookmarkOrAttempt(null, bookmark);
  }

  async function handleAttempted(event) {
    Requests.attempted({
      questionId: details.questionId,
      contestId: id,
      attempted: event.target.value,
      userId: props?.userData?._id,
    })
      .then(({ data: { data, success, error } }) => {
        if (success) {
          setAttempted(event.target.value);
          bookmarkOrAttempt(event.target.value, bookmark);
        }
      })
      .catch((err) => {});
  }

  async function handleBookmark() {
    await Requests.bookmark({
      questionId: details.questionId,
      contestId: id,
      bookmark: !bookmark,
      userId: props?.userData?._id,
    })
      .then(({ data: { success, data, error } }) => {
        if (success)
          setBookmark((initial) => {
            bookmarkOrAttempt(attempted, !initial);
            return !initial;
          });
      })
      .catch(() => {});
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
        onChange={async (event) => {
          await handleAttempted(event);
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
          onClick={async () => {
            await handleBookmark();
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
  return {
    userData: state.userData,
    registeredEvents: state.registeredEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    bookmarkOrAttempt: (details) => {
      dispatch(bookmarkOrAttempt(details));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
