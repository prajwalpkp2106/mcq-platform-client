import {
  BOOKMARKORATTEMP,
  ENTERCONTEST,
  LOGIN,
  LOGOUT,
  REGISTEREDEVENTS,
  STARTLOADING,
  STOPLOADING,
} from "./actions";

const initialState = {
  token: localStorage.getItem("usertoken"),
  isAuthenticated: false,
  userData: {},
  registeredEvents: [],
  loading: false,
  loadingMessage: "Loading...",
  testing: true,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN: {
      return {
        ...state,
        isAuthenticated: true,
        userData: payload,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("usertoken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        userData: null,
      };
    }
    case REGISTEREDEVENTS: {
      return {
        ...state,
        registeredEvents: payload,
      };
    }
    case STARTLOADING: {
      return {
        ...state,
        loadingMessage: payload,
        loading: true,
      };
    }
    case STOPLOADING: {
      return {
        ...state,
        loading: false,
        loadingMessage: initialState.loadingMessage,
      };
    }
    case ENTERCONTEST: {
      state.registeredEvents = state.registeredEvents.map((event) => {
        if (event.contestId == payload.contestId) {
          return payload;
        }
        return event;
      });

      return {
        ...state,
      };
    }
    case BOOKMARKORATTEMP: {
      state.registeredEvents = state.registeredEvents.filter((contest) => {
        if (contest.contestId === payload.contestId) {
          contest.questions = contest.questions?.map((question) => {
            if (question.questionId === payload.questionId) {
              console.log("Match found for questionId");
              question.bookmark = payload.bookmark;
              question.attempted = payload.attempted;
            }
            return question;
          });
        }
        return contest;
      });

      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
