import { format } from "date-fns";
import { ReactNode, useContext } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

import { GlobalContext } from "@/store/GlobalState";
import { IComment } from "@/utils/interface";
import { toast } from "react-toastify";
import { patchData } from "@/utils/fetchData";

interface IProps {
  children?: ReactNode;
  comments: IComment[];
  setComments: Function;
}

const CommentList = ({ children, comments, setComments }: IProps) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { user, token } = state.auth;

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
    <div className="w-full h-auto px-3 py-2 flex flex-col space-y-2">
      {comments.map((comment) => (
        <div className="flex items-center space-x-2 mb-2" key={comment._id}>
          <div className="flex flex-shrink-0 self-start cursor-pointer">
            <img
              src={
                typeof comment.user === "object"
                  ? comment.user.avatar
                  : "/avatar.jpg"
              }
              alt={
                typeof comment.user === "object"
                  ? comment.user.username
                  : "No Name"
              }
              className="h-8 w-8 object-cover rounded-full"
            />
          </div>

          <div className="flex items-center justify-center space-x-2">
            <div className="block min-w-[250px]">
              <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                <div className="font-medium flex justify-between items-center py-1">
                  <a href="#" className="hover:underline text-md">
                    <small>
                      {typeof comment.user === "object" &&
                        comment.user.username}
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
                                  message:
                                    "Bạn có chắn chắn muốn xóa bình luận",
                                  handleSure: () =>
                                    handleDeleteComment(comment._id),
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
                  <a href="#" className="hover:underline">
                    <small>Reply</small>
                  </a>

                  <a href="#" className="hover:underline">
                    <small>
                      {format(
                        new Date(comment.updatedAt as string),
                        "dd/MM/yy"
                      )}
                    </small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
