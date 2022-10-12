import React, { ReactElement } from "react";
import Layout from "../../views/Layout";
import Cards from "../../views/Pages/Cards";
import { useRouter } from "next/router";

import { getData } from "../../utils/fetchData";
import Loading from "../../components/Loading";

export default function Category({ tags, count }: any) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />;
  }

  const seo = {
    metaTitle: "Chuyên mục",
    metaDescription: `Tất cả bài viết theo chuyên mục`,
  };

  return <Cards posts={tags} />;
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
    const res = await getData(`category/${slug}`);
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
  return <Layout>{page}</Layout>;
};
