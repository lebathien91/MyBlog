import { ReactElement, useContext, useState } from "react";
import Layout from "@/layout/index";
import { GlobalContext } from "@/store/GlobalState";
import { FaFacebookF, FaTiktok, FaTwitter } from "react-icons/fa";
import { FormSubmit, InputChange, IUser } from "@/utils/interface";

export default function Profile() {
  const { state, dispatch } = useContext(GlobalContext);

  const { user, token } = state.auth;

  const initialState = {
    _id: "",
    avatar: "",
    username: "",
    password: "",
    cf_password: "",
    email: "",
    role: "user",
    aboutMe: "",
  };

  const [formData, setFormData] = useState<IUser>(initialState);

  const { _id, avatar, username, email, password, cf_password, aboutMe } =
    formData;

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();

    const data = formData;
  };
  return (
    <form
      className="container grid grid-cols-3 my-12 gap-8"
      onSubmit={handleSubmit}
    >
      <aside className="col-span-1">
        <div className="border rounded-md shadow-md p-4 mt-16">
          <div className="mx-auto w-40 h-40 rounded-full overflow-hidden mt-[-100px]">
            <img src={avatar ? avatar : user?.avatar} />
          </div>

          <h2 className="uppercase text-gray-600 text-center my-4">
            {username ? username : user?.username}
          </h2>
          <p className="text-center">
            {aboutMe
              ? aboutMe
              : user?.aboutMe
              ? user.aboutMe
              : "Vài dòng giới thiệu ngắn gọn về bản thân bạn để cho mọi người biết về bạn?"}
          </p>

          <div className="mt-12 mb-6 flex items-center justify-center text-2xl">
            <a href="https://facebook.com" title="Facebook">
              <FaFacebookF className="text-[#4267B2]" />
            </a>
            <a href="https://twitter.com/" title="Twitter">
              <FaTwitter className="mx-6 text-[#1DA1F2]" />
            </a>
            <a href="https://www.tiktok.com/" title="Tiktok">
              <FaTiktok className="text-[#833AB4]" />
            </a>
          </div>
        </div>
      </aside>
      <main className="col-span-2">
        <div className="flex justify-end">
          <button
            type="submit"
            className="border py-2 px-4 bg-cyan-800 rounded-md text-white font-bold"
          >
            Save
          </button>
        </div>
        <div className="border rounded-md shadow-md p-4 mt-6">
          <div className="mb-8">
            <label htmlFor="username" className="w-full text-xl font-semibold">
              UserName
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Your Name"
              defaultValue={user?.username && user?.username}
              onChange={handleChangeInput}
              className="w-full p-2 pr-8 block mt-1 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-[#2563eb] focus:border focus:outline-none"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="email" className="w-full text-xl font-semibold">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Your Email"
              disabled={true}
              defaultValue={user?.email && user?.email}
              className="w-full p-2 pr-8 block mt-1 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-[#2563eb] focus:border focus:outline-none"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="w-full text-xl font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChangeInput}
              className="w-full p-2 pr-8 block mt-1 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-[#2563eb] focus:border focus:outline-none"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="cf_password"
              className="w-full text-xl font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="cf_password"
              id="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
              className="w-full p-2 pr-8 block mt-1 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-[#2563eb] focus:border focus:outline-none"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="aboutMe" className="w-full text-xl font-semibold">
              About Me
            </label>
            <textarea
              name="aboutMe"
              id="aboutMe"
              rows={3}
              placeholder="About me"
              defaultValue={user?.aboutMe && user?.aboutMe}
              onChange={handleChangeInput}
              className="w-full p-2 pr-8 block mt-1 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-[#2563eb] focus:border focus:outline-none"
            ></textarea>
          </div>
        </div>
      </main>
    </form>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};