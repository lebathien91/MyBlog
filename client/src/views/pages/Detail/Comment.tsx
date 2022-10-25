import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/store/GlobalState";
import { FormSubmit } from "@/utils/interface";
import { postData, getData } from "@/utils/fetchData";
import { toast } from "react-toastify";

interface ICommentProps {
  articleId: string;
  articleUserId: string;
}
const Comment = ({ articleId, articleUserId }: ICommentProps) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { user, token } = state.auth;
  const [content, setContent] = useState("");

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getData(`comment/article/${articleId}`).then((res) => {
      console.log(res);
    });
  }, []);

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();

    const data = {
      articleId,
      articleUserId,
      content,
      replyComment: [],
    };

    const res = await postData(`comment`, data, token);

    if (res.error) toast.error(res.error, { theme: "colored" });

    setContent("");
    toast.success(res.success);
  };

  return (
    <div id="comment">
      <h1 className="mt-12">Comment</h1>
      {user && (
        <div className="my-8">
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="w-16 h-16 mr-4 overflow-hidden rounded-full">
                <img src={user.avatar} />
              </div>

              <div className="flex-[1_1]">
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
              </div>
            </div>
          </form>
        </div>
      )}

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
