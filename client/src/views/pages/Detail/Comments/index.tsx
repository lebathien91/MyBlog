import { GlobalContext } from "@/store/GlobalState";
import { getData, postData } from "@/utils/fetchData";
import { IComment } from "@/utils/interface";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Avatar } from "./Avatar";
import Comment from "./Comment";
import { InputComment } from "./InputComment";

interface ICommentProps {
  articleId: string;
  articleUserId: string;
}
const Comments = ({ articleId, articleUserId }: ICommentProps) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { user, token } = state.auth;
  const [comments, setComments] = useState<Array<IComment>>([]);

  useEffect(() => {
    getData(`comment/article/${articleId}?populate=user`)
      .then((res) => {
        setComments(res.comments);
      })
      .catch((error) => {
        console.log(error);
        setComments([]);
      });
  }, [articleId]);

  const handleComment = async (content: string) => {
    const data = {
      user,
      articleId,
      articleUserId,
      content,
      replyComment: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData(`comment`, data, token);
    dispatch({ type: "NOTIFY", payload: {} });
    if (res.error) toast.error(res.error, { theme: "colored" });

    setComments([data, ...comments]);
    return toast.success(res.success);
  };
  return (
    <div id="comment">
      <h1 className="mt-12">Comment</h1>
      {user && <InputComment callback={handleComment} />}
      <div className="w-full h-auto py-2 flex flex-col space-y-2">
        {comments.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
