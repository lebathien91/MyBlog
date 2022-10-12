import Link from "next/link";
import { ReactElement, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Admin from "@/views/Layout/Admin";
import { GlobalContext } from "@/store/GlobalState";
import { getData } from "@/utils/fetchData";
import { FormSubmit, ICategory, InputChange } from "@/utils/interface";

export default function NewTag() {
  const { state, dispatch } = useContext(GlobalContext);

  const initialState = {
    name: "",
    description: "",
    category: "",
    thumbnail: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    getData("category")
      .then((res) => {
        setCategories(res.categories);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, { theme: "colored" });
      });
  }, []);

  const { name, description, category, thumbnail } = formData;

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    toast.success("Gui du lieu thanh cong");
    console.log(formData);
    dispatch({ type: "NOTIFY", payload: {} });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex justify-between px-8 mb-8">
        <h2 className="text-4xl">Create an entry</h2>
        <button className="px-4 py-2 bg-green-800 rounded-sm text-white text-md font-semibold">
          Save
        </button>
      </div>
      <div className="w-full grid grid-cols-8">
        <div className="col-span-8 lg:col-span-4 xl:col-span-5 bg-white p-8 rounded-md shadow-md border">
          <div className="mb-8">
            <label htmlFor="name" className="w-full text-xl font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name Tag"
              value={name}
              onChange={handleChangeInput}
              className="w-full p-2 pr-8 block mt-1 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-[#2563eb] focus:border focus:outline-none"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="category" className="w-full text-xl font-semibold">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={handleChangeInput}
              className="w-full p-2 pr-8 block mt-1 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-[#2563eb] focus:border focus:outline-none"
            >
              <option value="">-- Choose --</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-8">
            <label htmlFor="thumbnail" className="w-full text-xl font-semibold">
              Thumbnail
            </label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              value={thumbnail}
              onChange={handleChangeInput}
              className="w-full block mt-1"
            />
          </div>
          <div className="">
            <label
              htmlFor="description"
              className="w-full text-xl font-semibold"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              placeholder="Description Tag"
              value={description}
              onChange={handleChangeInput}
              className="w-full p-2 pr-8 block mt-1 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-[#2563eb] focus:border focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:pl-8">
          <div className="bg-white border border-gray-300 rounded-md overflow-hidden shadow-md shadow-slate-300 hover:shadow-2xl hover:shadow-slate-300">
            <Link href="#">
              <a>
                <img
                  src="https://res.cloudinary.com/kuchuoi/image/upload/v1662444829/Diseases/jpe803fyhzckocfxpn8r.webp"
                  alt="Example"
                />
              </a>
            </Link>
            <main className="px-4">
              <h2 className="py-2">
                <Link href="#">
                  <a>{name ? name : "Title Example"}</a>
                </Link>
              </h2>
              <p className="line-clamp-3">
                {description
                  ? description
                  : "Phần mô tả tóm tắt nội dung. Phần này thường dài khoảng ~ 200 ký tự trong đó nêu những nội dung nổi bật của bài"}
              </p>
            </main>
            <footer className="px-4 py-2 flex justify-between text-[17px]">
              <Link href="#">
                <a>
                  {category
                    ? categories.filter(
                        (cat) => cat._id?.toString() == category
                      )[0].name
                    : "Category"}
                </a>
              </Link>
              <span>{new Date().toISOString()}</span>
            </footer>
          </div>
        </div>
      </div>
    </form>
  );
}

NewTag.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
