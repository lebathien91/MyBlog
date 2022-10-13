import { ReactElement, useContext, useEffect, useState } from "react";

import {
  MdCategory,
  MdLocalOffer,
  MdOutlineArticle,
  MdOutlineAccessTime,
} from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import Table from "../../components/DataTable";
import { BiEdit, BiTrash } from "react-icons/bi";

import AuthRouter from "../../views/layout/AuthRouter";
import { IArticle, ICategory, ITag, IUser } from "../../utils/interface";
import { getData } from "../../utils/fetchData";
import { toast } from "react-toastify";
import { GlobalContext } from "@/store/GlobalState";
import Link from "next/link";

export default function DashboardPage() {
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

    getData(`category?limit=${5}`)
      .then((res) => {
        setCategories(res.categories);
        setCountCategories(res.count);
      })
      .catch((error) => {
        toast.error(error, { theme: "colored" });
      });

    getData(`article?limit=${5}`)
      .then((res) => {
        setArticles(res.articles);
        setCountArticles(res.count);
      })
      .catch((error) => {
        toast.error(error, { theme: "colored" });
      });

    getData(`tag?limit=${5}`)
      .then((res) => {
        setTags(res.tags);
        setCountTag(res.count);
      })
      .catch((error) => {
        toast.error(error, { theme: "colored" });
      });
  }, []);

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
      category: "Article",
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
                <h3 className="text-2xl text-[#3c4858]">{card.count}</h3>
              </div>
              <div className="flex items-center border-t border-[#eee] mt-4 pt-2 pb-1">
                <i className="mr-2 text-[#999]">
                  <MdOutlineAccessTime />
                </i>
                <a href="#" className="text-[#999] text-[13px]">
                  {card.time}
                </a>
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

                  <td className="py-3 border-b pr-8">{article.title}</td>

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
                                type: "DELETE_ARTICLE",
                                id: article._id,
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

                  <td className="py-3 pr-8 border-b">{tag.name}</td>

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
                              modal: { type: "DELETE_TAG", id: tag._id },
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
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthRouter isAuth me>
      {page}
    </AuthRouter>
  );
};
