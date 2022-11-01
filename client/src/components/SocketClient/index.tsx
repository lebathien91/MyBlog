import { GlobalContext } from "@/store/GlobalState";
import { IComment } from "@/utils/interface";
import React, { useContext, useEffect } from "react";

const SocketClient = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const socket = state.socket;

  //   Create Comment
  useEffect(() => {
    if (!socket) return;

    socket.on("createComment", (data: IComment) => {
      console.log(data);
    });

    return () => {
      socket.off("createComment");
    };
  }, [socket, dispatch]);

  return <div>SocketClient</div>;
};

export default SocketClient;
