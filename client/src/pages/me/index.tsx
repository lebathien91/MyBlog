import { ReactElement } from "react";

import {
  MdCategory,
  MdLocalOffer,
  MdOutlineArticle,
  MdOutlineAccessTime,
} from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { articles } from "../../utils/data/articles";
import Table from "../../components/Table";
import { BiEdit, BiTrash } from "react-icons/bi";
import { tags } from "../../utils/data/tags";
import Admin from "../../views/Layout/Admin";

const cards = [
  {
    icon: <FaUserAlt size="36px" />,
    color: "bg-[#ffa726]",
    category: "Users",
    title: "235",
    time: "Just Updated",
  },
  {
    icon: <MdCategory size="36px" />,
    color: "bg-[#66bb6a]",
    category: "Categories",
    title: "5",
    time: "Just Updated",
  },
  {
    icon: <MdLocalOffer size="36px" />,
    color: "bg-[#ef5350]",
    category: "Tags",
    title: "75",
    time: "Just Updated",
  },
  {
    icon: <MdOutlineArticle size="36px" />,
    color: "bg-[#26c6da]",
    category: "Article",
    title: "+245",
    time: "Just Updated",
  },
];

export default function DashboardPage() {
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
                <p className="text-[#999]">{card.category}</p>
                <h3 className="text-2xl text-[#3c4858]">{card.title}</h3>
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
            title="Title Table"
            subtitle="Subtitle Table"
            headerColor="bg-[#ab47bc]"
          >
            <thead className="text-blue-800 font-semibold text-md">
              <tr>
                <th className="py-3 border-b text-center pr-4">ID</th>
                <th className="py-3 border-b text-left">Title</th>
                <th className="py-3 border-b text-left">Users</th>
                <th className="py-3 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr key={article.id}>
                  <td className="py-3 border-b text-center pr-4">{i + 1}</td>

                  <td className="py-3 border-b">{article.title}</td>
                  <td className="py-3 border-b">{article.user}</td>
                  <td className="py-3 border-b">
                    <div className="flex">
                      <a href="#" className="mr-3 text-sky-800 text-xl">
                        <BiEdit />
                      </a>
                      <a href="#" className="text-red-700 text-xl">
                        <BiTrash />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-span-1">
          <Table
            title="Title Table"
            subtitle="Subtitle Table"
            headerColor="bg-[#ffa726]"
          >
            <thead className="text-blue-800 font-semibold text-md">
              <tr>
                <th className="py-3 border-b text-center pr-4">ID</th>
                <th className="py-3 border-b text-left">Name</th>
                <th className="py-3 border-b text-left">Category</th>
                <th className="py-3 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {tags.slice(0, 5).map((tag, i) => (
                <tr key={tag.id}>
                  <td className="py-3 border-b text-center pr-4">{i + 1}</td>

                  <td className="py-3 border-b">{tag.name}</td>
                  <td className="py-3 border-b">{tag.category}</td>
                  <td className="py-3 border-b">
                    <div className="flex">
                      <a href="#" className="mr-3 text-sky-800 text-xl">
                        <BiEdit />
                      </a>
                      <a href="#" className="text-red-700 text-xl">
                        <BiTrash />
                      </a>
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
    <Admin isAuth me>
      {page}
    </Admin>
  );
};
