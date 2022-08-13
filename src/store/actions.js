export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTEREDEVENTS = "REGISTEREDEVENTS";
export const STARTLOADING = "STARTLOADING";
export const STOPLOADING = "STOPLOADING";
export const ENTERCONTEST = "ENTERCONTEST";
export const BOOKMARKORATTEMP = "BOOKMARKORATTEMP";

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

export const startLoading = (message = "Loading....") => {
  return { type: STARTLOADING, payload: message };
};

export const stopLoading = () => {
  return { type: STOPLOADING };
};

export const enterContest = (participantDetails) => {
  return { type: ENTERCONTEST, payload: participantDetails };
};

export const bookmarkOrAttempt = ({
  contestId,
  questionId,
  bookmark,
  attempted,
}) => {
  return {
    type: BOOKMARKORATTEMP,
    payload: { contestId, questionId, bookmark, attempted },
  };
};
