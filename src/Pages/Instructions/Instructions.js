import { Button, Layout, List, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { enterContest, startLoading, stopLoading } from "../../store/actions";
import { connect } from "react-redux";
import { Requests } from "../../utils";
const { Footer, Content } = Layout;

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
  "Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3Instruction3",
];

const Instructions = (props) => {
  const { id } = useParams();
  const [data, setData] = useState(dummyData);

  const navigate = useNavigate();

  function checkIfEntered() {
    const registeredEvents = props.registeredEvents;

    let entered = false;

    if (registeredEvents) {
      registeredEvents.forEach((element) => {
        if (element.contestId == id && element.started) {
          entered = true;
        }
      });
    }

    return entered;
  }

  useEffect(() => {
    props.startLoading();

    //  get instructions for an event
    if (checkIfEntered()) navigate(`/${id}/solve`);
    else {
      Requests.enterContest(props.userData._id, id).then(
        ({ data: { success, data, error } }) => {
          if (success) {
            props.enterContest(data);
          }
        }
      );
    }
    props.stopLoading();
  }, []);

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
          <ol
            style={{ textAlign: "left", fontSize: "1.2rem" }}
            className="px-8 xl:px-16 xl:py-4 list-decimal"
          >
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

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    userData: state.userData,
    registeredEvents: state.registeredEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: (message) => dispatch(startLoading(message)),
    stopLoading: () => dispatch(stopLoading()),
    enterContest: (participantDetails) =>
      dispatch(enterContest(participantDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);
