import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/store/GlobalState";
import { FormSubmit, IComment } from "@/utils/interface";

interface IProps {
  callback: (content: string) => void;
  setOnReply?: Function;
  edit?: IComment;
  setEdit?: Function;
}

export const InputComment = ({
  edit,
  setEdit,
  callback,
  setOnReply,
}: IProps) => {
  const { state } = useContext(GlobalContext);
  const { user } = state.auth;
  const [content, setContent] = useState("");

  useEffect(() => {
    if (edit) setContent(edit.content);
  }, [edit]);

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();

    callback(content);
    setContent("");
  };

  const handleCancel = () => {
    if (setOnReply) setOnReply(false);
    if (edit && setEdit) return setEdit(undefined);
    setContent("");
  };

  if (!user) return <div>Login</div>;

  return (
    <div className="my-8">
      <div className="flex">
        <div className="w-12 h-12 mr-4 overflow-hidden rounded-full">
          <img src={user.avatar} />
        </div>
        <form className="flex-[1_1]" onSubmit={handleSubmit}>
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
              onClick={handleCancel}
              value="Cancel"
            />

            <input
              className="px-4 py-2 bg-green-800 rounded-sm text-white text-md font-semibold"
              type="submit"
              value={edit ? "Update" : "Submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
