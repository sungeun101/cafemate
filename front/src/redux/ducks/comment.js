export const GET_COMMENT = 'GET_COMMENT';
const SET_COMMENT = 'SET_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';

export const getComment = () => ({
  type: GET_COMMENT,
});
export const setComment = (comment) => ({
  type: SET_COMMENT,
  comment,
});

const initialState = {
  comment: undefined,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      const { comment } = action;
      return { ...state, comment };
    default:
      return state;
  }
};

export default commentReducer;
