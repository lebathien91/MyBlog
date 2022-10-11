import { ReactElement, useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { toast } from "react-toastify";

import Admin from "../../../views/Layout/Admin";
import Editor from "../../../components/Editor";

import { FormSubmit, InputChange } from "../../../utils/interface";
import { tags } from "../../../utils/data/tags";
import { articles } from "../../../utils/data/articles";
import { useRouter } from "next/router";
import moment from "moment";

export default function UpdateArticle() {
  const router = useRouter();
  const { id } = router.query;

  const initialState: {
    title: string;
    description: string;
    tag: string | number;
    content: string;
  } = {
    title: "",
    description: "",
    tag: "",
    content: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [body, setBody] = useState<string>("");
  const [tagId, setTagId] = useState<string | number>("");
  const [defaultTag, setDefaultTag] = useState<string | number | undefined>();

  useEffect(() => {
    if (id) {
      // Get Data
      const article = articles.find((article) => {
        return article.id.toString() === id;
      });
      if (article) {
        const { title, description, tag, content } = article;
        setFormData({ title, description, tag, content });

        const tagName = tags.find((item) => {
          return item.id === tag;
        });

        setDefaultTag(tagName?.name);
        setBody(content);
      } else {
        toast.error("Không tìm thấy bài viết");
      }
    }
  }, [id]);

  const { title, description, tag, content } = formData;

  const loadTags = async (inputValue: string) => {
    let options: { value: string | number; label: string }[] = [];
    try {
      if (inputValue.length < 2) return { options };

      // Get Tags
      tags.forEach((tag) => {
        options.push({
          value: tag.id,
          label: tag.name,
        });
      });

      return { options };
    } catch (error) {
      console.log(error);
      return { options };
    }
  };

  const handleChangeTagSelect = (e: any) => {
    setTagId(e.value);
  };

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target as HTMLInputElement;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    if (!tagId)
      return toast.error("Bạn chưa nhập Tag cho bài viết", {
        theme: "colored",
      });

    console.log({ ...formData, tag: tagId, content: body });
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
        <div className="p-8 col-span-8 lg:col-span-5 bg-white rounded-md shadow-md border">
          <div className="mb-8">
            <label htmlFor="title" className="w-full text-xl font-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
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
          <div className="">
            <label htmlFor="content" className="w-full text-xl font-semibold">
              Content
            </label>
            <Editor body={body} setBody={setBody} />
          </div>
        </div>
        <div className="col-span-8 lg:col-span-3">
          <div className="rounded-md shadow-md p-6 mb-8 bg-white border">
            <h3 className="uppercase text-gray-500 border-b">Relation</h3>
            <div className="my-4">
              <label htmlFor="tag" className="w-full text-xl font-semibold">
                Tag
              </label>
              <AsyncPaginate
                instanceId="tag"
                defaultOptions
                placeholder={defaultTag}
                loadOptions={loadTags}
                onChange={handleChangeTagSelect}
                debounceTimeout={500}
                className="mt-2"
              />
            </div>
          </div>
          <div className="rounded-md shadow-md p-6 mb-8 bg-white border">
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

UpdateArticle.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
