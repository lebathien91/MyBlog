import { IComment, IUser } from "@/utils/interface";
import { useEffect, useState } from "react";

import { Avatar } from "./Avatar";
import CommentList from "./CommentList";

interface IProps {
  comment: IComment;
  deleteComment: (id: string) => void;
}

const Comment = ({ comment, deleteComment }: IProps) => {
  const [showReply, setShowReply] = useState<IComment[]>([]);

  useEffect(() => {
    if (!comment.replyComment) return;
    setShowReply(comment.replyComment);
  }, [comment.replyComment]);

  return (
    <div className="flex items-center space-x-2 mb-2">
      <Avatar user={comment.user as IUser} />

      <CommentList
        comment={comment}
        showReply={showReply}
        setShowReply={setShowReply}
        deleteComment={deleteComment}
      >
        {showReply.map((commentReply, i) => (
          <div key={i} className="flex items-center space-x-2 mb-2">
            <Avatar user={comment.user as IUser} />
            <CommentList
              comment={commentReply}
              showReply={showReply}
              setShowReply={setShowReply}
              deleteComment={deleteComment}
            />
          </div>
        ))}
      </CommentList>
    </div>
  );
};

export default Comment;
