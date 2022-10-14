import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { MdClose, MdRestore } from "react-icons/md";
import { toast } from "react-toastify";

import AuthRouter from "@/middleware/AuthRouter";
import Pagination from "@/components/Pagination";
import Table from "@/components/DataTable";
import { GlobalContext } from "@/store/GlobalState";
import { getData, patchData, patchManyData } from "@/utils/fetchData";
import { FormSubmit, InputChange, ITag } from "@/utils/interface";

export default function TrashTagsPage() {
  const router = useRouter();

  const { state, dispatch } = useContext(GlobalContext);
  const { auth } = state;
  const token = auth?.token;

  const [posts, setPosts] = useState<ITag[]>([]);
  const [select, setSelect] = useState<string>();
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const pages = Math.ceil(count / limit);
  const page = router.query.page || 1;

  useEffect(() => {
    // getPost & getCount dựa trên page and limit
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    getData(`tag/trash?populate=category&page=${page}&limit=${limit}`, token)
      .then((res) => {
        if (!res.error) {
          setPosts(res.tags);
          setCount(res.count);
        }

        dispatch({ type: "NOTIFY", payload: {} });
      })
      .catch((error) => {
        setPosts([]);
        setCount(0);
        dispatch({ type: "NOTIFY", payload: {} });

        toast.error(error, { theme: "colored" });
      });
  }, [limit, page]);

  const handleCheckBox = (e: InputChange) => {
    const { value, checked } = e.target as HTMLInputElement;

    if (value === "allSelect") {
      const newPosts = posts.map((post) => {
        return { ...post, isChecked: checked };
      });
      setPosts(newPosts);
    } else {
      const newPosts = posts.map((post) =>
        post._id?.toString() === value ? { ...post, isChecked: checked } : post
      );
      setPosts(newPosts);
    }
  };

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    let selectPosts: any = [];
    posts.forEach((post) => {
      if (post.isChecked) {
        selectPosts.push(post._id);
      }
    });

    if (select === "DESTROY_MULTI_TAG") {
      return dispatch({
        type: "NOTIFY",
        payload: {
          modal: { type: select, id: selectPosts },
        },
      });
    }

    if (select === "RESTORE_MULTI_TAG") {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      const res = await patchManyData("/tag/restore", selectPosts, token);
      dispatch({ type: "NOTIFY", payload: {} });

      if (res.error) toast.error(res.error, { theme: "colored" });
      const newPosts = posts.filter((post) => {
        return !selectPosts.includes(post._id);
      });
      setPosts(newPosts);
      setCount((prev) => prev - selectPosts.length);

      return toast.success(res.success, { theme: "colored" });
    }
  };

  const handleRestore = async (id: string | undefined) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await patchData(`tag/restore/${id}`, {}, token);
    dispatch({ type: "NOTIFY", payload: {} });

    if (res.error) return toast.error(res.error, { theme: "colored" });

    const newPosts = posts.filter((post) => {
      return post._id !== id;
    });
    setPosts(newPosts);
    setCount((prev) => prev - 1);

    return toast.success(res.success, { theme: "colored" });
  };
  return (
    <>
      <div className="flex justify-between px-4">
        <div className="flex">
          <form onSubmit={handleSubmit}>
            <select
              name="select"
              id="select"
              onChange={(e) => setSelect(e.target.value)}
              className="py-2 px-4 border border-gray-400 rounded-sm outline-none"
            >
              <option>--Action--</option>
              <option value="RESTORE_MULTI_TAG">Restore</option>
              <option value="DESTROY_MULTI_TAG">Destroy</option>
            </select>
            <button className="ml-4 px-4 py-2 bg-yellow-600 rounded-sm text-white text-md font-semibold">
              Thực hiện
            </button>
          </form>
        </div>
        <Link href="/me/tag/create">
          <a className="px-4 py-2 bg-green-800 rounded-sm text-white text-md font-semibold">
            Create Tag
          </a>
        </Link>
      </div>
      <div className="px-4 my-4 font-semibold text-sky-700">
        <Link href="/me/tag">
          <a className="mx-2 px-2 border-r border-slate-800">Public</a>
        </Link>

        <a className="text-gray-500">Trash ({count})</a>
      </div>

      <Table
        title="Title Table"
        subtitle="Subtitle Table"
        headerColor="bg-red-500"
      >
        <thead className="text-blue-800 font-semibold text-md">
          <tr>
            <th className="py-3 border-b text-center pr-4">
              <input
                type="checkbox"
                value="allSelect"
                checked={
                  posts.length !== 0 &&
                  !posts.some((post) => post?.isChecked != true)
                }
                onChange={handleCheckBox}
              />
            </th>
            <th className="py-3 border-b text-left pr-4">ID</th>
            <th className="py-3 border-b text-left">Name</th>
            <th className="py-3 border-b text-left">Category</th>
            <th className="py-3 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td className="py-3 border-b text-center pr-4">
                <input
                  type="checkbox"
                  value={post._id}
                  checked={post?.isChecked || false}
                  onChange={handleCheckBox}
                />
              </td>
              <td className="py-3 border-b pr-4">{index + 1}</td>
              <td className="py-3 border-b">{post.name}</td>
              <td className="py-3 border-b">
                {typeof post.category === "object" && post.category?.name}
              </td>
              <td className="py-3 border-b">
                <div className="flex">
                  <button
                    className="mr-3 text-sky-800 text-xl"
                    onClick={() => handleRestore(post._id)}
                  >
                    <MdRestore />
                  </button>
                  <button
                    className="text-red-700 text-xl"
                    onClick={() =>
                      dispatch({
                        type: "NOTIFY",
                        payload: {
                          modal: { type: "DESTROY_TAG", id: post._id },
                        },
                      })
                    }
                  >
                    <MdClose />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination limit={limit} setLimit={setLimit} pages={pages} />
    </>
  );
}

TrashTagsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthRouter>{page}</AuthRouter>;
};
