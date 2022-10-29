import { GlobalContext } from "@/store/GlobalState";
import { getData, patchData, postData } from "@/utils/fetchData";
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

    const newComment = { ...res.newComment, user };

    setComments([newComment, ...comments]);
    return toast.success(res.success);
  };

  const handleDeleteComment = async (id: string) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await patchData(`comment/${id}`, {}, token);
    dispatch({ type: "NOTIFY", payload: {} });

    if (res.error) return toast.error(res.error, { theme: "colored" });
    const newPosts = comments.filter((comment) => {
      return comment._id !== id;
    });
    setComments(newPosts);

    return toast.success(res.success, { theme: "colored" });
  };
  return (
    <div id="comment">
      <h1 className="mt-12">Comment</h1>
      {user && <InputComment callback={handleComment} />}
      <div className="w-full h-auto py-2 flex flex-col space-y-2">
        {comments.map((comment, i) => (
          <Comment
            comment={comment}
            deleteComment={handleDeleteComment}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
