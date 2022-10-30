import { createContext, ReactNode, useEffect, useReducer } from "react";
import { getCookie } from "typescript-cookie";
import { getData } from "../utils/fetchData";
import Reducers from "./Reducer";
import { io } from "socket.io-client";

const initialState = {
  notify: {},
  auth: { loading: true },
};

export const GlobalContext = createContext<any>(initialState);

const GlobalState = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(Reducers, initialState);

  useEffect(() => {
    const logined = localStorage.getItem("Logined");
    const token = getCookie("refreshtoken");

    if (logined && token) {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      getData("auth", token).then((res) => {
        if (res.error) {
          localStorage.removeItem("Logined");
          dispatch({ type: "AUTH", payload: {} });
          return dispatch({ type: "NOTIFY", payload: {} });
        }

        dispatch({
          type: "AUTH",
          payload: { token: res.accessToken, user: res.user },
        });
        return dispatch({ type: "NOTIFY", payload: {} });
      });
    } else {
      dispatch({ type: "AUTH", payload: {} });
    }
  }, []);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
