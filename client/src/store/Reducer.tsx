import { ACTIONS } from "./Actions";

const Reducers = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};

export default Reducers;
