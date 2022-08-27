import { Button, Layout, List, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { enterContest, startLoading, stopLoading } from "../../store/actions";
import { connect } from "react-redux";
import { Requests } from "../../utils";
import Countdown from "../../Components/Countdown";
const { Footer, Content } = Layout;

const dummyData = [];

const Instructions = (props) => {
  const { id } = useParams();
  const [data, setData] = useState(dummyData);
  const [contestData, setContestData] = useState({});

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
      Requests.getContestById(id).then((res) => {
        res = res?.data;
        if (res?.success) {
          setContestData(res?.data);
          if (res?.data?.status?.description != "RUNNING") {
            navigate("/");
          }
        }
      });
    }
    props.stopLoading();
  }, []);

  return (
    <>
      <Layout
        style={{
          height: "90vh",
          overflow: "auto",
        }}
      >
        <Content className="flex justify-center items-center flex-col">
          <h1 className="text-4xl xl:my-4">
            {contestData?.status?.description == "NOTSTARTED" ? (
              <div className="space-y-2">
                <span>"Contest will start in"</span>
                <Countdown seconds={contestData?.status?.time}></Countdown>
              </div>
            ) : (
              "Start When you are ready"
            )}
          </h1>
          <ol
            style={{ textAlign: "left", fontSize: "1.2rem" }}
            className="px-8 xl:px-16 xl:py-4 list-decimal"
          >
            {data.map((ti) => (
              <li className="text-sm xl:my-4">{ti}</li>
            ))}
          </ol>
          <Footer>
            {contestData?.status?.description == "RUNNING" && (
              <Link to={`/${id}/solve`}>
                <Button type="success" size="large" className="text-black">
                  Next
                </Button>
              </Link>
            )}
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
