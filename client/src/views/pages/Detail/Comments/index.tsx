import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { GlobalContext } from "@/store/GlobalState";
import Comment from "./Comment";
import { InputComment } from "./InputComment";
import { getData, patchData, postData } from "@/utils/fetchData";
import { IComment } from "@/utils/interface";

interface ICommentProps {
  articleId: string;
  articleUserId: string;
}
const Comments = ({ articleId, articleUserId }: ICommentProps) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { user, token } = state.auth;
  const [comments, setComments] = useState<Array<IComment>>([]);

  useEffect(() => {
    getData(`comment/article/${articleId}`)
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

    return setComments([newComment, ...comments]);
  };

  const handleDeleteComment = async (comment: IComment) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await patchData(`comment/${comment._id}`, {}, token);
    dispatch({ type: "NOTIFY", payload: {} });

    if (res.error) return toast.error(res.error, { theme: "colored" });

    let newComments: IComment[];

    if (comment.commentRoot) {
      newComments = comments.map((item) =>
        item._id === comment.commentRoot
          ? {
              ...item,
              replyComment: item.replyComment.filter(
                (repCM) => repCM._id !== comment._id
              ),
            }
          : item
      );
    } else {
      newComments = comments.filter((item) => item._id !== comment._id);
    }

    setComments(newComments);

    return toast.success(res.success, { theme: "colored" });
  };

  return (
    <div id="comment">
      <h1 className="mt-12">Comment</h1>
      <InputComment callback={handleComment} />
      <div className="w-full h-auto pl-10 py-8 mt-8 flex flex-col space-y-2">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            deleteComment={handleDeleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
