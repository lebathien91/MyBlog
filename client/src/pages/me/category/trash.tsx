import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect, useState } from "react";

import { MdClose, MdRestore } from "react-icons/md";
import { toast } from "react-toastify";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import { GlobalContext } from "../../../store/GlobalState";
import { categories } from "../../../utils/data/categories";
import { getData } from "../../../utils/fetchData";
import { FormSubmit, Icategory, InputChange } from "../../../utils/interface";
import Admin from "../../../views/Layout/Admin";

export default function TrashCategoriesPage() {
  const router = useRouter();

  const { state, dispatch } = useContext(GlobalContext);
  const { auth } = state;
  const token = auth?.token;

  const [posts, setPosts] = useState<Icategory[]>([]);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const pages = Math.ceil(count / limit);
  const page = router.query.page || 1;

  useEffect(() => {
    // getPost & getCount dựa trên page and limit
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    getData(`category/trash?page=${page}&limit=${limit}`, token)
      .then((res) => {
        if (!res.error) {
          setPosts(res.categories);
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
        post._id.toString() === value ? { ...post, isChecked: checked } : post
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
              <option value="delete">Xóa</option>
            </select>
            <button className="ml-4 px-4 py-2 bg-yellow-600 rounded-sm text-white text-md font-semibold">
              Thực hiện
            </button>
          </form>
        </div>
        <Link href="/me/category/create">
          <a className="px-4 py-2 bg-green-800 rounded-sm text-white text-md font-semibold">
            Create Category
          </a>
        </Link>
      </div>
      <div className="px-4 my-4 font-semibold text-sky-700">
        <Link href="/me/category">
          <a className="mx-2 px-2 border-r border-slate-800">Public</a>
        </Link>

        <a className="text-gray-500">Trash ({count})</a>
      </div>

      <Table
        title="Title Table"
        subtitle="Subtile Table"
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
            <th className="py-3 border-b text-left">Slug</th>

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
              <td className="py-3 border-b">{post.slug}</td>

              <td className="py-3 border-b">
                <div className="flex">
                  <a href="#" className="mr-3 text-sky-800 text-xl">
                    <MdRestore />
                  </a>
                  <a href="#" className="text-red-700 text-xl">
                    <MdClose />
                  </a>
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

TrashCategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
