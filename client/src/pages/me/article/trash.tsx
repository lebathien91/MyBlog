import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdClose, MdRestore } from "react-icons/md";

import AuthRouter from "@/middleware/AuthRouter";
import Table from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import { FormSubmit, IArticle, InputChange } from "@/utils/interface";
import { deleteData, getData, patchData } from "@/utils/fetchData";
import { GlobalContext } from "@/store/GlobalState";

export default function TrashArticlesPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<IArticle[]>([]);
  const [select, setSelect] = useState<string>();
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const pages = Math.ceil(count / limit);
  const page = router.query.page || 1;

  const { state, dispatch } = useContext(GlobalContext);
  const auth = state.auth;
  const token = auth?.token;

  useEffect(() => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    // getPost & getCount dựa trên page and limit
    getData(`article/trash?populate=user&page=${page}&limit=${limit}`, token)
      .then((res) => {
        setPosts(res.articles);
        setCount(res.count);
        dispatch({ type: "NOTIFY", payload: {} });
      })
      .catch((error) => {
        console.log(error);
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

  const handleDestroy = async (id: string | undefined) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await deleteData(`article/${id}`, {}, token);
    dispatch({ type: "NOTIFY", payload: {} });

    if (res.error) return toast.error(res.error, { theme: "colored" });
    const newPosts = posts.filter((post) => {
      return post._id !== id;
    });
    setPosts(newPosts);
    setCount((prev) => prev - 1);
    return toast.success(res.success, { theme: "colored" });
  };

  const handeMutiDestroy = async (ids: Array<string | undefined>) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await deleteData("article", ids, token);
    dispatch({ type: "NOTIFY", payload: {} });

    if (res.error) return toast.error(res.error, { theme: "colored" });

    const newPosts = posts.filter((post) => {
      return !ids.includes(post._id);
    });
    setPosts(newPosts);
    setCount((prev) => prev - ids.length);

    return toast.success(res.success, { theme: "colored" });
  };

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    let selectPosts: any = [];
    posts.forEach((post) => {
      if (post.isChecked) {
        selectPosts.push(post._id);
      }
    });

    if (select === "DESTROY_MULTI_ARTICLE") {
      return dispatch({
        type: "NOTIFY",
        payload: {
          modal: {
            title: "Xóa bài viết",
            message: "Thông báo",
            handleSure: () => handeMutiDestroy(selectPosts),
          },
        },
      });
    }

    if (select === "RESTORE_MULTI_ARTICLE") {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      const res = await patchData("/article/restore", selectPosts, token);
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
    const res = await patchData(`article/restore/${id}`, {}, token);
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
              <option value="RESTORE_MULTI_ARTICLE">Restore</option>
              <option value="DESTROY_MULTI_ARTICLE">Destroy</option>
            </select>
            <button className="ml-4 px-4 py-2 bg-yellow-600 rounded-sm text-white text-md font-semibold">
              Thực hiện
            </button>
          </form>
        </div>
        <Link href="/me/article/create">
          <a className="px-4 py-2 bg-green-800 rounded-sm text-white text-md font-semibold">
            Create Article
          </a>
        </Link>
      </div>
      <div className="px-4 my-4 font-semibold text-sky-700">
        <Link href="/me/article">
          <a className="mx-2 px-2 border-r border-slate-800">Public</a>
        </Link>

        <a className="text-gray-500">Trash ({count})</a>
      </div>

      <Table
        headerColor="bg-red-500"
        title="Title Table"
        subtitle="Subtitle Table"
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
            <th className="py-3 border-b text-left">Title</th>
            <th className="py-3 border-b text-left">Users</th>
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
              <td className="py-3 border-b">{post.title}</td>
              <td className="py-3 border-b">
                {typeof post.user === "object" && post.user.username}
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
                          modal: {
                            title: "Chuyển thùng rác",
                            message: "Thông điệp",
                            handleSure: () => handleDestroy(post._id),
                          },
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

TrashArticlesPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthRouter>{page}</AuthRouter>;
};
