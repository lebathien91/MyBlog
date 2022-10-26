import { GlobalContext } from "@/store/GlobalState";
import { patchData } from "@/utils/fetchData";
import { IComment } from "@/utils/interface";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { Avatar } from "./Avatar";

interface IProps {
  comment: IComment;
}

const Comment = ({ comment }: IProps) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { user, token } = state.auth;

  const [onReply, setOnReply] = useState(false);

  const handleDeleteComment = async (id: string) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await patchData(`comment/${id}`, {}, token);
    dispatch({ type: "NOTIFY", payload: {} });

    if (res.error) return toast.error(res.error, { theme: "colored" });
    // const newPosts = comments.filter((comment) => {
    //   return comment._id !== id;
    // });
    // setComments(newPosts);

    return toast.success(res.success, { theme: "colored" });
  };
  return (
    <div className="flex items-center space-x-2 mb-2">
      <div className="flex flex-shrink-0 self-start cursor-pointer">
        <img
          src={
            typeof comment.user === "object"
              ? comment.user.avatar
              : "/avatar.jpg"
          }
          alt={
            typeof comment.user === "object" ? comment.user.username : "No Name"
          }
          className="h-8 w-8 object-cover rounded-full"
        />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-start space-x-2">
          <div className="block min-w-[250px]">
            <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
              <div className="font-medium flex justify-between items-center py-1">
                <a href="#" className="hover:underline text-md">
                  <small>
                    {typeof comment.user === "object" && comment.user.username}
                  </small>
                </a>
                {user &&
                  (user.root ||
                    user.role === "admin" ||
                    (typeof comment.user === "object" &&
                      user._id === comment.user._id)) && (
                    <div>
                      <a className="inline-block cursor-pointer text-sky-700 mr-2">
                        <BiEdit size={18} />
                      </a>
                      <a
                        className="inline-block cursor-pointer text-red-600"
                        onClick={() =>
                          dispatch({
                            type: "NOTIFY",
                            payload: {
                              modal: {
                                title: "Xóa bình luận",
                                message: "Bạn có chắn chắn muốn xóa bình luận",
                                handleSure: () =>
                                  handleDeleteComment(comment._id as string),
                              },
                            },
                          })
                        }
                      >
                        <BiTrash size={18} />
                      </a>
                    </div>
                  )}
              </div>
              <div className="text-md">{comment.content}</div>
            </div>
            <div className="flex justify-start items-center text-sm">
              <div className="w-full font-semibold text-gray-700 px-2 flex items-center justify-between space-x-1">
                <button
                  className="hover:underline"
                  onClick={() => setOnReply(!onReply)}
                >
                  <small>Reply</small>
                </button>

                <a href="#" className="hover:underline">
                  <small>
                    {format(new Date(comment.updatedAt as string), "dd/MM/yy")}
                  </small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
