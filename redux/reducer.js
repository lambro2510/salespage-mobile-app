const initialState = {
  token: null,
  isLogin: null,
  username: null,
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
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
      };
    case 'REMOVE_USERNAME':
      return {
        ...state,
        username: null,
      };
    default:
      return state;
  }
};

export default Reducer;
