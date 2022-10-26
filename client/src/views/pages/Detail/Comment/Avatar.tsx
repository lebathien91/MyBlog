import React from "react";
import { IUser } from "@/utils/interface";

export const Avatar = ({ user }: { user: IUser }) => {
  return (
    <div className="w-16 h-16 mr-4 overflow-hidden rounded-full">
      <img src={user.avatar} />
    </div>
  );
};
