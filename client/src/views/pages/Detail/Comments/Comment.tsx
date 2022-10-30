import { IComment } from "@/utils/interface";
import { useEffect, useState } from "react";

import CommentList from "./CommentList";

interface IProps {
  comment: IComment;
  deleteComment: (comment: IComment) => void;
}

const Comment = ({ comment, deleteComment }: IProps) => {
  const [showReply, setShowReply] = useState<IComment[]>([]);

  useEffect(() => {
    if (!comment.replyComment) return;
    setShowReply(comment.replyComment);
  }, [comment.replyComment]);

  return (
    <div className="flex items-center space-x-2 mb-2">
      <CommentList
        comment={comment}
        showReply={showReply}
        setShowReply={setShowReply}
        deleteComment={deleteComment}
      >
        {showReply.map((commentReply, i) => (
          <div
            key={commentReply._id}
            className="flex items-center space-x-2 mb-2"
          >
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
