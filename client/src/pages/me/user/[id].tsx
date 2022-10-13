import moment from "moment";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { users } from "../../../utils/data/users";
import { FormSubmit, InputChange, IUser } from "../../../utils/interface";

import Admin from "../../../views/layout/Admin";

export default function UpdateUser() {
  const router = useRouter();

  const { id } = router.query;

  const initialState = {
    avatar: "",
    username: "",
    password: "",
    cf_password: "",
    email: "",
    role: 0,
  };

  const [formData, setFormData] = useState<IUser>(initialState);

  useEffect(() => {
    if (id) {
      const user = users.find((user) => {
        return user.id.toString() === id;
      });

      if (user) {
        setFormData({
          ...formData,
          ...user,
        });
      }
    }
  }, [id]);

  const { username, email, password, cf_password, role } = formData;

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    const { username, role } = formData;

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
      <div className="grid grid-cols-8">
        <div className="p-8 col-span-5 bg-white rounded-md shadow-md">
          <div className="mb-8">
            <label htmlFor="username" className="w-full text-xl font-semibold">
              UserName
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Your Name"
              value={username}
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
              defaultValue={email}
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
            <label htmlFor="role" className="w-full text-xl font-semibold">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={handleChangeInput}
              className="w-full p-2 pr-8 block mt-1 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-[#2563eb] focus:border focus:outline-none"
            >
              <option value="0">User</option>
              <option value="1">Editor</option>
              <option value="2">Admin</option>
            </select>
          </div>
        </div>
        <div className="col-span-3 ml-8  ">
          <div className="rounded-md shadow-md p-6 mb-8 bg-white">
            <h3 className="uppercase text-gray-500 border-b">Infomation</h3>
            <div className="flex justify-between py-3">
              <span>Created</span>
              <span>Now</span>
            </div>
            <div className="flex justify-between py-3">
              <span>Updated</span>
              <span>{moment().format("D/MM/YY")}</span>
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

UpdateUser.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
