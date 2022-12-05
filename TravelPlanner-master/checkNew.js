const WAITING_NEW = "NEW/WAITING";
const TOUCHED_NEW = "NEW/TOUCHED";
const CREATE_NEW = "NEW/CREATE";
const CREATE_ROOT = "ROOT/CREATE";

export const STATE_NEW = {
  WAITING: "WAITING",
  ONCE: "ONCE",
  CREATE: "CREATE",
  ROOT: "ROOT",
};

export const setWaiting = (checkNew) => ({ type: WAITING_NEW, checkNew });
export const touchedNew = (checkNew) => ({ type: TOUCHED_NEW, checkNew });
export const createNew = (checkNew) => ({ type: CREATE_NEW, checkNew });
export const createRoot = (checkNew) => ({ type: CREATE_ROOT, checkNew });

const initialState = {
  checkNew: STATE_NEW.WAITING,
};

const checkNew = (state = initialState, action) => {
  switch (action.type) {
    case WAITING_NEW:
      return {
        ...state,
        checkNew: STATE_NEW.WAITING,
      };
    case TOUCHED_NEW:
      return {
        ...state,
        checkNew: STATE_NEW.ONCE,
      };
    case CREATE_NEW:
      return {
        ...state,
        checkNew: STATE_NEW.CREATE,
      };
    case CREATE_ROOT:
      return {
        ...state,
        checkNew: STATE_NEW.ROOT,
      };
    default:
      return state;
  }
};

export default checkNew;
