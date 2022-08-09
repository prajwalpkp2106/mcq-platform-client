import { LOGIN, LOGOUT, REGISTEREDEVENTS, USERSUBMISSION } from "./actions";

const initialState = {
  token: localStorage.getItem("usertoken"),
  isAuthenticated: false,
  userData: {},
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
    default:
      return state;
  }
}
