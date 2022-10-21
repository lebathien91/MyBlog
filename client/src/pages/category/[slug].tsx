import { ReactElement } from "react";
import { useRouter } from "next/router";

import Layout from "@/layout/index";
import Tags from "@/views/pages/Tags";
import Loading from "@/components/Loading";
import { getData } from "@/utils/fetchData";
import { ITag } from "@/utils/interface";
import Seo from "@/components/Seo";

interface ICategory {
  tags: Array<ITag>;
  count: number;
}

export default function Category({ tags, count }: ICategory) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />;
  }

  return <Tags posts={tags} />;
}

export async function getStaticPaths() {
  const res = await getData("category");

  const paths = res.categories.map((category: any) => ({
    params: {
      slug: category.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  try {
    const slug = params?.slug;
    const res = await getData(`category/slug/${slug}`);
    const catId = res.category._id;

    const tagsRes = await getData(`tag?category=${catId}`);

    const { tags, count } = tagsRes;

    if (!tags || !count || !slug) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        tags,
        count,
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

Category.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Seo title="Chuyên mục" />
      {page}
    </Layout>
  );
};
