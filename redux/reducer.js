const initialState = {
  token: null,
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
    default:
      return state;
  }
};

export default Reducer;
