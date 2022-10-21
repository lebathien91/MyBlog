import type { ReactElement } from "react";

import Layout from "@/layout/index";
import Tags from "@/views/pages/Tags";
import { getData } from "@/utils/fetchData";

import { ITag } from "@/utils/interface";
import Seo from "@/components/Seo";

interface IHome {
  tags: Array<ITag>;
  count: number;
}

export default function Home({ tags, count }: IHome) {
  return (
    <>
      <Seo title="Trang chủ" />
      <Tags posts={tags} />
    </>
  );
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
