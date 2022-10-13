import { GlobalContext } from "@/store/GlobalState";
import {
  deleteData,
  deleteManyData,
  patchData,
  patchManyData,
} from "@/utils/fetchData";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const Modal = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(GlobalContext);
  const { modal } = state.notify;
  const token = state.auth.token;

  const handleSubmit = async () => {
    const handleModal = async (type: string, id: object) => {
      switch (type) {
        // Xử lý User
        case "DELETE_USER":
          return await patchData(`user/${id}`, {}, token);
        case "DESTROY_USER":
          return await deleteData(`user/${id}`, token);
        case "DELETE_MULTI_USER":
          return await patchManyData("user", id, token);
        case "DESTROY_MULTI_USER":
          return await deleteManyData("user", id, token);

        // Xử lý Category
        case "DELETE_CATEGORY":
          return await patchData(`category/${id}`, {}, token);
        case "DESTROY_CATEGORY":
          return await deleteData(`category/${id}`, token);
        case "DELETE_MULTI_CATEGORY":
          return await patchManyData("category", id, token);
        case "DESTROY_MULTI_CATEGORY":
          return await deleteManyData("category", id, token);

        // Xử lý Tag
        case "DELETE_TAG":
          return await patchData(`tag/${id}`, {}, token);
        case "DESTROY_TAG":
          return await deleteData(`tag/${id}`, token);
        case "DELETE_MULTI_TAG":
          return await patchManyData("tag", id, token);
        case "DESTROY_MULTI_TAG":
          return await deleteManyData("tag", id, token);

        // Xử lý Article
        case "DELETE_ARTICLE":
          return await patchData(`article/${id}`, {}, token);
        case "DESTROY_ARTICLE":
          return await await deleteData(`article/${id}`, token);
        case "DELETE_MULTI_ARTICLE":
          return await patchManyData("article", id, token);
        case "DESTROY_MULTI_ARTICLE":
          return await deleteManyData("article", id, token);

        default:
          return { error: "Bạn cần chọn hành động" };
      }
    };

    const { type, id } = modal;

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await handleModal(type, id);
    dispatch({ type: "NOTIFY", payload: {} });

    if (res.error) return toast.error(res.error, { theme: "colored" });

    router.reload();
    return toast.success(res.success, { theme: "colored" });
  };
  return (
    <div className="fixed top-0 left-0 z-40 w-full h-full overflow-x-hidden overflow-y-auto outline-none">
      <div className="fixed top-0 left-0 bg-gray-800 opacity-30 w-full h-full"></div>
      <div className="relative z-50 m-2 md:mx-auto md:my-8 max-w-[500px] w-auto pointer-events-none ">
        <div className="relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding border border-gray-400 rounded-md outline-none">
          <div className="flex flex-shrink-0 items-center justify-between p-3 border-b border-[#dee2e6] rounded-tl-[calc(0.3rem - 1px)] rounded-tr-[calc(0.3rem-1px)]">
            <h5 className="text-xl md:text-2xl font-semibold">Modal Title</h5>
            <span
              className="cursor-pointer"
              onClick={() => dispatch({ type: "NOTIFY", payload: {} })}
            >
              <MdClose size={25} />
            </span>
          </div>
          <div className="relative flex-auto px-4 py-6">
            <p className="text-xl">Bạn có muốn xoá phần tử này</p>
          </div>
          <div className="flex flex-wrap flex-shrink-0 items-center justify-end p-3 border-t border-t-[#dee2e6] rounded-br-[calc(0.3rem-1px)] border-bl-[calc(0.3rem-1px)]">
            <button
              className="m-1 font-medium text-center px-4 py-2 border rounded-md text-white bg-red-600 hover:bg-gray-500"
              onClick={handleSubmit}
            >
              Yes
            </button>
            <button
              className="m-1 font-medium text-center px-4 py-2 border rounded-md text-white bg-green-800 hover:bg-gray-500"
              onClick={() => dispatch({ type: "NOTIFY", payload: {} })}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
