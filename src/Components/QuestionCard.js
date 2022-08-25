import { Button, Card, Radio, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bookmarkOrAttempt } from "../store/actions";
import { Requests } from "../utils";
import { getQuestionById } from "../utils/Requests";

function QuestionCard({ details, ...props }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});
  const [attempted, setAttempted] = useState(null);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    setLoading(true);
    details?.questionId &&
      getQuestionById(details.questionId)
        .then(({ data: { success, data, error } }) => {
          setLoading(false);
          if (success) setQuestion(data);
        })
        .catch((err) => {
          setLoading(false);
        });
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

  async function clearResponse() {
    setLoading(true);
    Requests.clearAttempted({
      questionId: details.questionId,
      contestId: id,
      userId: props?.userData?._id,
    })
      .then(({ data: { success, data, error } }) => {
        setAttempted(null);
        bookmarkOrAttempt(null, bookmark);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  async function handleAttempted(event) {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  async function handleBookmark() {
    setLoading(true);
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
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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
    <Spin spinning={loading} tip={"Processing..."}>
      <Card
        className="m-0"
        title={
          <div className="">
            <p className="mb-2 overflow-auto h-auto whitespace-pre-line">{`Q ${
              props.questionNumber + 1
            }. ${question.title}`}</p>
            {question?.imageLinks?.length > 0 && (
              <div className="grid gap-2">
                {question?.imageLinks?.map((link) => {
                  return (
                    <img
                      src={link}
                      className="max-h-[400px] max-w-full inline-block"
                    ></img>
                  );
                })}
              </div>
            )}
          </div>
        }
      >
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
            onClick={async () => {
              await clearResponse();
            }}
            danger
            className=" hover:bg-red-500 hover:text-white"
            disabled={!attempted}
          >
            Clear Response
          </Button>
        </div>
      </Card>
    </Spin>
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
