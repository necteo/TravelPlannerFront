export const TOUCHED_NEW = "NEW/TOUCHED";
export const CREATE_NEW = "NEW/CREATE";

export const touchedNew = (checkNew) => ({ type: TOUCHED_NEW, checkNew });
export const createNew = (checkNew) => ({ type: CREATE_NEW, checkNew });

const initialState = {
  checkNew: false,
};

const checkNew = (state = initialState, action) => {
  switch (action.type) {
    case TOUCHED_NEW:
      return {
        ...state,
        checkNew: action.checkNew,
      };
    case CREATE_NEW:
      return {
        ...state,
        checkNew: action.checkNew,
      };
    default:
      return state;
  }
};

export default checkNew;
