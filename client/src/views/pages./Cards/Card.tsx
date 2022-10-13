import React from "react";
import Link from "next/link";
import { Itag } from "../../../utils/interface";
import NextImage from "../../../components/Image";

const Card = ({ post }: { post: Itag }) => {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden shadow-md shadow-slate-300 hover:shadow-2xl hover:shadow-slate-300">
      <Link href="/detail">
        <a>
          <NextImage src={post.thumbnail} alt={post.name} />
        </a>
      </Link>
      <main className="px-4">
        <h2 className="py-2">
          <Link href="/detail">
            <a>{post.name}</a>
          </Link>
        </h2>
        <p className="line-clamp-3">{post.description}</p>
      </main>
      <footer className="px-4 py-2 flex justify-between text-[17px]">
        <Link href="/detail">
          <a>{typeof post.category === "object" && post.category.name}</a>
        </Link>
        <span>{post.createdAt}</span>
      </footer>
    </div>
  );
};

export default Card;
