import { FormSubmit, InputChange } from "@/utils/interface";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleChangeInput = (e: InputChange) => {
    const { value } = e.target as HTMLInputElement;
    setEmail(value);
  };

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <main>
      <section className="relative w-full h-full py-32 min-h-screen">
        <div className="absolute top-0 w-full h-full bg-gray-800 bg-no-repeat bg-full"></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-5/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-200 border-0">
                <div className="flex-auto px-4 lg:px-10 pt-10 pb-20">
                  <div className="text-center my-6 text-gray-600">
                    <h2>Khôi phục mật khẩu</h2>
                    <p className="my-2">Nhập email để khôi phục mật khẩu</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="relative w-full mb-3">
                      <label
                        htmlFor="email"
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleChangeInput}
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="text-center mt-10">
                      <button className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
