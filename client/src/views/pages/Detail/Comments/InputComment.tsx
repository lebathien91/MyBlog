import { useContext, useState } from "react";
import { toast } from "react-toastify";

import { GlobalContext } from "@/store/GlobalState";
import { postData } from "@/utils/fetchData";
import { FormSubmit } from "@/utils/interface";
import { Avatar } from "./Avatar";

interface IProps {
  callback: (content: string) => void;
}

export const InputComment = ({ callback }: IProps) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { user, token } = state.auth;
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();

    callback(content);
    setContent("");
  };

  if (!user) return <div>Login</div>;

  return (
    <form className="flex-[1_1]" onSubmit={handleSubmit}>
      <input
        className=" w-full pt-4 pb-2 focus:outline-none border-b border-gray-400 focus:border-gray-900"
        placeholder="Viết bình luận..."
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="mt-2 text-right">
        <input
          className="px-4 py-2 bg-gray-200 rounded-sm text-black text-md font-semibold mr-4 cursor-pointer"
          type="button"
          onClick={() => setContent("")}
          value="Cancel"
        />

        <input
          className="px-4 py-2 bg-green-800 rounded-sm text-white text-md font-semibold"
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
};
