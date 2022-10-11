import type { ReactElement } from "react";
import Layout from "../views/Layout";
import Cards from "../views/Pages/Cards";

import { getData } from "../utils/fetchData";

export default function Home({ tags, count }: any) {
  return <Cards posts={tags} />;
}

export async function getStaticProps() {
  try {
    const res = await getData(`tag?populate=category`);

    const { tags, count } = res;

    return {
      props: {
        tags,
        count,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
