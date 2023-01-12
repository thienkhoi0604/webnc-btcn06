import ACTIONS from "../actions/";

const initialState = {
  user: [],
  userLogin: {},
  isLogged: false,
  isAdmin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.USER_LOGIN:
      return {
        ...state,
        userLogin: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
