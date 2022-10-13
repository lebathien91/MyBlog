import React from "react";
import Card from "./Card";
import { Itag } from "../../../utils/interface";

const Cards = ({ posts }: { posts: Itag[] }) => {
  return (
    <>
      <div className="container my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
        {posts.map((post, index) => (
          <Card post={post} key={index} />
        ))}
      </div>
      <div className="container text-center my-4">
        <button className="px-4 py-2 border-2 border-[#1e73be] hover:bg-[#1e73be] hover:text-white rounded-md uppercase font-semibold translate ease-out duration-500 hover:scale-125">
          Loadmore
        </button>
      </div>
    </>
  );
};

export default Cards;
