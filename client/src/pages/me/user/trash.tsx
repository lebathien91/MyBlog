import Link from "next/link";
import { ReactElement, useContext, useEffect, useState } from "react";
import { MdClose, MdRestore } from "react-icons/md";
import Table from "../../../components/Table";
import Admin from "../../../views/layout/Admin";
import Pagination from "../../../components/Pagination";
import { useRouter } from "next/router";
import { FormSubmit, Iuser } from "../../../utils/interface";

import { GlobalContext } from "../../../store/GlobalState";
import { getData } from "../../../utils/fetchData";
import { toast } from "react-toastify";

export default function TrashUsersPage() {
  const router = useRouter();

  const { state, dispatch } = useContext(GlobalContext);
  const { auth } = state;
  const token = auth.token;

  const [posts, setPosts] = useState<Iuser[]>([]);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const pages = Math.ceil(count / limit);
  const page = router.query.page || 1;

  useEffect(() => {
    // getPost & getCount dựa trên page and limit
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    getData(`user/trash?page=${page}&limit=${limit}`, token)
      .then((res) => {
        setPosts(res.users);
        setCount(res.count);
        dispatch({ type: "NOTIFY", payload: {} });
      })
      .catch((error) => {
        setPosts([]);
        setCount(0);
        dispatch({ type: "NOTIFY", payload: {} });

        toast.error(error);
      });
  }, [limit, page]);

  const handleCheckBox = (e: any) => {
    const { value, checked } = e.target;

    if (value === "allSelect") {
      const newPosts = posts.map((post) => {
        return { ...post, isChecked: checked };
      });
      setPosts(newPosts);
    } else {
      const newPosts = posts.map((post) =>
        post._id == value ? { ...post, isChecked: checked } : post
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
        <Link href="/me/user/create">
          <a className="px-4 py-2 bg-green-800 rounded-sm text-white text-md font-semibold">
            Create User
          </a>
        </Link>
      </div>
      <div className="px-4 my-4 font-semibold text-sky-700">
        <Link href="/me/user">
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
            <th className="py-3 border-b pr-4 text-center">
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
            <th className="py-3 border-b text-left">Email</th>
            <th className="py-3 border-b text-left">Role</th>
            <th className="py-3 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td className="py-3 border-b pr-4 text-center">
                <input
                  type="checkbox"
                  value={post._id}
                  checked={post?.isChecked || false}
                  onChange={handleCheckBox}
                />
              </td>
              <td className="py-3 border-b pr-4">{index + 1}</td>
              <td className="py-3 border-b">{post.username}</td>
              <td className="py-3 border-b">{post.email}</td>
              <td className="py-3 border-b">{post.role}</td>
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

TrashUsersPage.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
