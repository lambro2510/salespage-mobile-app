const initialState = {
  token: null,
  isLogin: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'REMOVE_TOKEN':
      return {
        ...state,
        token: null,
      };
    case 'SET_LOGIN':
      return {
        ...state,
        isLogin: true,
      };
    case 'SET_LOGOUT':
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default Reducer;
