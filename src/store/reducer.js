import {
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
        loading: true,
      };
    }
    case STOPLOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
