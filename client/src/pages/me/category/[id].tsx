import moment from "moment";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { categories } from "../../../utils/data/categories";
import { FormSubmit, InputChange } from "../../../utils/interface";
import Admin from "../../../views/Layout/Admin";

export default function UpdateCategory() {
  const router = useRouter();
  const { id } = router.query;

  const initialState: {
    name: string | undefined;
    description: string | undefined;
  } = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (id) {
      const category = categories.find((category) => {
        return category.id.toString() === id;
      });

      if (category) {
        setFormData({ name: category.name, description: category.description });
      }
    }
  }, [id]);

  const { name, description } = formData;

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex justify-between px-8 mb-8">
        <h2 className="text-4xl">Create an article</h2>
        <button className="px-4 py-2 bg-green-800 rounded-sm text-white text-md font-semibold">
          Save
        </button>
      </div>
      <div className="grid grid-cols-8 gap-8">
        <div className="p-8 col-span-8 lg:col-span-5 bg-white rounded-md shadow-md">
          <div className="mb-8">
            <label htmlFor="title" className="w-full text-xl font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={handleChangeInput}
              className="w-full p-2 pr-8 block mt-1 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-[#2563eb] focus:border focus:outline-none"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="description"
              className="w-full text-xl font-semibold"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Description..."
              value={description}
              onChange={handleChangeInput}
              className="w-full p-2 pr-8 block mt-1 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-[#2563eb] focus:border focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div className="col-span-8 lg:col-span-3">
          <div className="rounded-md shadow-md p-6 mb-8 bg-white">
            <h3 className="uppercase text-gray-500 border-b">Infomation</h3>
            <div className="flex justify-between py-3">
              <span>Created</span>
              <span>Now</span>
            </div>
            <div className="flex justify-between py-3">
              <span>Updated</span>
              <span>{moment().format("DD/MM/Y")}</span>
            </div>
            <div className="flex justify-between py-3">
              <span>By</span>
              <span>Your Name</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

UpdateCategory.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
