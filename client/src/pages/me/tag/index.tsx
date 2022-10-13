import Link from "next/link";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BiEdit, BiTrash } from "react-icons/bi";

import AuthRouter from "@/layout/AuthRouter";
import Table from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import { GlobalContext } from "@/store/GlobalState";
import { getData } from "@/utils/fetchData";
import { FormSubmit, InputChange, ITag } from "@/utils/interface";

export default function TagsPage() {
  const router = useRouter();

  const { state, dispatch } = useContext(GlobalContext);
  const { auth } = state;
  const token = auth?.token;

  const [posts, setPosts] = useState<ITag[]>([]);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const pages = Math.ceil(count / limit);
  const page = router.query.page || 1;

  useEffect(() => {
    // getPost & getCount dựa trên page and limit
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    getData(`tag?populate=category&page=${page}&limit=${limit}`, token)
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

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    let selectPosts: any = [];
    posts.forEach((post) => {
      if (post.isChecked) {
        selectPosts.push(post._id);
      }
    });
    console.log(selectPosts);
  };

  return (
    <>
      <div className="flex justify-between px-4">
        <div className="flex">
          <form onSubmit={handleSubmit}>
            <select
              name="select"
              id="select"
              className="py-2 px-4 border border-gray-400 rounded-sm outline-none"
            >
              <option>--Action--</option>
              <option value="delete">Delete</option>
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
        <a className="mx-2 px-2 border-r border-slate-800 text-gray-500">
          Public ({count})
        </a>

        <Link href="/me/tag/trash">
          <a>Trash</a>
        </Link>
      </div>

      <Table title="Title Table" subtitle="Subtitle Table">
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
                  <Link href={`/me/tag/${post._id}`}>
                    <a className="mr-3 text-sky-800 text-xl">
                      <BiEdit />
                    </a>
                  </Link>
                  <button
                    className="text-red-700 text-xl"
                    onClick={() =>
                      dispatch({
                        type: "NOTIFY",
                        payload: {
                          modal: { type: "DELETE_TAG", id: post._id },
                        },
                      })
                    }
                  >
                    <BiTrash />
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

TagsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthRouter>{page}</AuthRouter>;
};
