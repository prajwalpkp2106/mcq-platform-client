export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTEREDEVENTS = "REGISTEREDEVENTS";
export const STARTLOADING = "STARTLOADING";
export const STOPLOADING = "STOPLOADING";

export const login = (userData) => {
  return {
    type: LOGIN,
    payload: userData,
  };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const setRegisteredEvents = (events) => {
  return { type: REGISTEREDEVENTS, payload: events };
};

export const startLoading = () => {
  return { type: STARTLOADING };
};

export const stopLoading = () => {
  return { type: STOPLOADING };
};
