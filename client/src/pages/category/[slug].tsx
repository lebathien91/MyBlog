import React, { ReactElement } from "react";
import Layout from "../../views/Layout";
import Cards from "../../views/Pages/Cards";
import { useRouter } from "next/router";

import { tags } from "../../utils/data/tags";

export default function Category() {
  const router = useRouter();

  const posts = tags.filter((tag) => {
    return tag.category === router.query.slug;
  });

  return <Cards posts={posts} />;
}

Category.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
