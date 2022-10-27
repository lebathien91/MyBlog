import { IComment, IUser } from "@/utils/interface";
import { useEffect, useState } from "react";

import { Avatar } from "./Avatar";
import CommentList from "./CommentList";

interface IProps {
  comment: IComment;
}

const Comment = ({ comment }: IProps) => {
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
      >
        {showReply.map((commentReply, i) => (
          <div key={i} className="flex items-center space-x-2 mb-2">
            <Avatar user={comment.user as IUser} />
            <CommentList
              comment={commentReply}
              showReply={showReply}
              setShowReply={setShowReply}
            />
          </div>
        ))}
      </CommentList>
    </div>
  );
};

export default Comment;
