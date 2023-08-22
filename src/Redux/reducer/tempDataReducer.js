const initialState = null;

const tempDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_TEMP_DATA":
      return action.payload;
    case "CLEAR_TEMP_DATA":
      return null;
    default:
      return state;
  }
};

export default tempDataReducer;