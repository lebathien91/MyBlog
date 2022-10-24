import { GlobalContext } from "@/store/GlobalState";
import { FormSubmit } from "@/utils/interface";
import React, { useContext, useState } from "react";

const Comment = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { user, token } = state.auth;
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();

    console.log(content);
  };
  return (
    <div id="comment">
      <h1 className="mt-12">Comment</h1>
      <div className="my-8">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <div className="w-16 h-16 mr-4 overflow-hidden rounded-full">
              <img src={user.avatar} />
            </div>

            <input
              className="flex-[1_1] pt-4 pb-2 focus:outline-none border-b border-gray-400 focus:border-gray-900"
              placeholder="Viết bình luận..."
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
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
      </div>
      <div>
        <ul>
          <li>item 1</li>
          <li>item 1</li>
          <li>item 1</li>
          <li>item 1</li>
        </ul>
      </div>
    </div>
  );
};

export default Comment;
