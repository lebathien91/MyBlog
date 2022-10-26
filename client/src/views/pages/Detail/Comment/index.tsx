import { GlobalContext } from "@/store/GlobalState";
import { getData } from "@/utils/fetchData";
import { IComment } from "@/utils/interface";
import { useContext, useEffect, useState } from "react";

import { Avatar } from "./Avatar";
import CommentList from "./CommentList";
import { InputComment } from "./InputComment";

interface ICommentProps {
  articleId: string;
  articleUserId: string;
}
const Comment = ({ articleId, articleUserId }: ICommentProps) => {
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

  return (
    <div id="comment">
      <h1 className="mt-12">Comment</h1>
      {user && (
        <div className="my-8">
          <div className="flex">
            <Avatar user={user} />
            <InputComment articleId={articleId} articleUserId={articleUserId} />
          </div>
        </div>
      )}

      <CommentList comments={comments} setComments={setComments}>
        <CommentList comments={comments} setComments={setComments} />
      </CommentList>
    </div>
  );
};

export default Comment;
