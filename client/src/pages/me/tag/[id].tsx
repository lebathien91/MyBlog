import Link from "next/link";
import { ReactElement, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

import { GlobalContext } from "../../../store/GlobalState";
import { FormSubmit, InputChange } from "../../../utils/interface";

import Admin from "../../../views/Layout/Admin";

import { categories as cats } from "../../../utils/data/categories";
import { useRouter } from "next/router";
import { tags } from "../../../utils/data/tags";
import NextImage from "../../../components/Image";

export default function UpdateTag() {
  const router = useRouter();
  const { id } = router.query;
  const { state, dispatch } = useContext(GlobalContext);

  const initialState: {
    name: string;
    description: string;
    category: string | number;
    thumbnail: string;
  } = {
    name: "",
    description: "",
    category: "",
    thumbnail: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [newThumbnail, setNewThumbnail] = useState<File>();
  const [categories, setCatgories] = useState(cats);
  const [categoryId, setCatgoryId] = useState<string | number>();

  useEffect(() => {
    if (id) {
      // Get Data
      const tag = tags.find((tag) => {
        return tag.id.toString() === id;
      });
      if (tag) {
        const { name, description, category, thumbnail } = tag;
        setFormData({ name, description, category, thumbnail });
      }
    }
  }, [id]);

  const { name, description, category, thumbnail } = formData;

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangThumbnail = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setNewThumbnail(file);
    }
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    toast.success("Gui du lieu thanh cong", { theme: "colored" });
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
                <option key={category.id} value={category.id}>
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
              accept="image/*"
              onChange={handleChangThumbnail}
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
            <NextImage
              src={
                newThumbnail
                  ? URL.createObjectURL(newThumbnail)
                  : thumbnail
                  ? thumbnail
                  : "https://res.cloudinary.com/kuchuoi/image/upload/v1662444829/Diseases/jpe803fyhzckocfxpn8r.webp"
              }
              alt="Example"
            />

            <main className="px-4">
              <h2 className="py-2">{name ? name : "Title Example"}</h2>
              <p className="line-clamp-3">
                {description
                  ? description
                  : "Phần mô tả tóm tắt nội dung. Phần này thường dài khoảng ~ 200 ký tự trong đó nêu những nội dung nổi bật của bài"}
              </p>
            </main>
            <footer className="px-4 py-2 flex justify-between text-[17px]">
              <span>
                {category
                  ? categories.filter((cat) => cat.id.toString() == category)[0]
                      .name
                  : "Category"}
              </span>

              <span>{moment().format("D/MM/YY")}</span>
            </footer>
          </div>
        </div>
      </div>
    </form>
  );
}

UpdateTag.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
