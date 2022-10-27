import React from "react";
import { IUser } from "@/utils/interface";

export const Avatar = ({ user }: { user: IUser }) => {
  return (
    <div className="flex flex-shrink-0 self-start cursor-pointer">
      <img
        src={user.avatar}
        alt={user.username}
        className="h-8 w-8 object-cover rounded-full"
      />
    </div>
  );
};
