import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  MdCategory,
  MdLocalOffer,
  MdOutlineArticle,
  MdOutlineAccessTime,
} from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { BiEdit, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";

import Table from "@/components/DataTable";
import { getData, patchData } from "@/utils/fetchData";
import { GlobalContext } from "@/store/GlobalState";

import { IArticle, ICategory, ITag, IUser } from "@/utils/interface";

const Dashboard = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const token = state.auth.token;

  const [users, setUsers] = useState<IUser[]>([]);
  const [countUsers, setCountUsers] = useState<number>(0);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [countCategories, setCountCategories] = useState<number>(0);
  const [tags, setTags] = useState<ITag[]>([]);
  const [countTag, setCountTag] = useState<number>(0);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [countArticle, setCountArticles] = useState<number>(0);

  useEffect(() => {
    getData(`user?limit=${5}`, token)
      .then((res) => {
        setUsers(res.user);
        setCountUsers(res.count);
      })
      .catch((error) => {
        toast.error(error, { theme: "colored" });
      });
  }, [countUsers]);

  useEffect(() => {
    getData(`category?limit=${5}`)
      .then((res) => {
        setCategories(res.categories);
        setCountCategories(res.count);
      })
      .catch((error) => {
        toast.error(error, { theme: "colored" });
      });
  }, [countCategories]);

  useEffect(() => {
    getData(`tag?limit=${5}`)
      .then((res) => {
        setTags(res.tags);
        setCountTag(res.count);
      })
      .catch((error) => {
        toast.error(error, { theme: "colored" });
      });
  }, [countTag]);

  useEffect(() => {
    getData(`article?limit=${5}`)
      .then((res) => {
        setArticles(res.articles);
        setCountArticles(res.count);
      })
      .catch((error) => {
        toast.error(error, { theme: "colored" });
      });
  }, [countArticle]);

  const handleDeleteArtile = async (id: string | undefined) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await patchData(`article/${id}`, {}, token);
    dispatch({ type: "NOTIFY", payload: {} });

    if (res.error) return toast.error(res.error, { theme: "colored" });

    const newArticles = articles.filter((article) => {
      return article._id !== id;
    });
    setArticles(newArticles);
    setCountArticles((prev) => prev - 1);
  };

  const handleDeleteTag = async (id: string | undefined) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await patchData(`tag/${id}`, {}, token);
    dispatch({ type: "NOTIFY", payload: {} });

    if (res.error) return toast.error(res.error, { theme: "colored" });

    const newTags = tags.filter((tag) => {
      return tag._id !== id;
    });
    setTags(newTags);
    setCountTag((prev) => prev - 1);
  };

  const cards = [
    {
      icon: <FaUserAlt size="36px" />,
      color: "bg-[#ffa726]",
      category: "Users",
      slug: "user",
      count: countUsers,
      time: "Just Updated",
    },
    {
      icon: <MdCategory size="36px" />,
      color: "bg-[#66bb6a]",
      category: "Categories",
      slug: "category",
      count: countCategories,
      time: "Just Updated",
    },
    {
      icon: <MdLocalOffer size="36px" />,
      color: "bg-[#ef5350]",
      category: "Tags",
      slug: "tag",
      count: countTag,
      time: "Just Updated",
    },
    {
      icon: <MdOutlineArticle size="36px" />,
      color: "bg-[#26c6da]",
      category: "Articles",
      slug: "article",
      count: countArticle,
      time: "Just Updated",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div className="col-span-1 my-8" key={index}>
            <div className="bg-white rounded-md py-2 px-4 shadow-md">
              <div className="relative text-right">
                <div
                  className={`float-left mt-[-28px] p-6 ${card.color} text-white rounded-sm`}
                >
                  {card.icon}
                </div>
                <p className="text-[#999]">
                  <Link href={`/me/${card.slug}`}>{card.category}</Link>
                </p>
                <h6 className="text-2xl text-[#3c4858]">{card.count}</h6>
              </div>
              <div className="flex items-center border-t border-[#eee] mt-4 pt-2 pb-1">
                <i className="mr-2 text-[#999]">
                  <MdOutlineAccessTime />
                </i>
                <Link href={`/me/${card.slug}`}>
                  <a className="text-[#999] text-[13px]">{card.time}</a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="col-span-1">
          <Table
            title="New Article"
            subtitle="Subtitle Table"
            headerColor="bg-[#ab47bc]"
          >
            <thead className="text-blue-800 font-semibold text-md">
              <tr>
                <th className="py-3 border-b text-center pr-4">ID</th>
                <th className="py-3 pr-8 border-b text-left">Title</th>

                <th className="py-3 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr key={article._id}>
                  <td className="py-3 pr-4 border-b text-center">{i + 1}</td>

                  <td className="py-3 border-b pr-8">
                    <h4 className="line-clamp-1" title={article.title}>
                      {article.title}
                    </h4>
                  </td>

                  <td className="py-3 border-b text-center">
                    <div className="flex items-center justify-center">
                      <Link href={`/me/article/${article._id}`}>
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
                              modal: {
                                title: "Chuyển thùng rác",
                                message: "Thông điệp",
                                handleSure: () =>
                                  handleDeleteArtile(article._id),
                              },
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
        </div>
        <div className="col-span-1">
          <Table
            title="New Tag"
            subtitle="Subtitle Table"
            headerColor="bg-[#ffa726]"
          >
            <thead className="text-blue-800 font-semibold text-md">
              <tr>
                <th className="py-3 border-b text-center pr-4">ID</th>
                <th className="py-3 pr-8 border-b text-left">Name</th>

                <th className="p-3 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, i) => (
                <tr key={tag._id}>
                  <td className="py-3 border-b text-center pr-4">{i + 1}</td>

                  <td className="py-3 pr-8 border-b">
                    <h4 title={tag.name} className="line-clamp-1">
                      {tag.name}
                    </h4>
                  </td>

                  <td className="p-3 border-b text-center">
                    <div className="flex items-center justify-center">
                      <Link href={`/me/tag/${tag._id}`}>
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
                              modal: {
                                title: "Chuyển thùng rác",
                                message: "Thông điệp",
                                handleSure: () => handleDeleteTag(tag._id),
                              },
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
