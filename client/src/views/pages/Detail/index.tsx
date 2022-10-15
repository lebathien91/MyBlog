import { parse } from "node-html-parser";
import slug from "slugify";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import TableContent from "./TableContent";
import Topic from "./Topic";
import Link from "next/link";
import { format } from "date-fns";

const Detail = ({ data }: any) => {
  const [activeTopic, setActiveTopic] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleOpen = () => {
    setActiveTopic(true);
    setIsMobile(true);
  };

  const handleClose = () => {
    setActiveTopic(false);
    setIsMobile(false);
  };

  const { disease, nameDisease, slugDisease, article, articleSlug, articles } =
    data;

  if (!article) {
    return <div className="single"></div>;
  }
  const wordsContent = article.content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordsContent / 200);

  const content = parse(article.content);
  const headings = content.querySelectorAll("h1, h2, h3");
  for (const heading of headings) {
    heading.setAttribute(
      "id",
      slug(heading.rawText, { locale: "vi", lower: true })
    );
  }

  return (
    <div className="relative">
      <IoIosArrowForward
        size="1.875rem"
        className={`sticky top-[53px] left-0 p-1 bg-[#dfd9d9] z-30 cursor-pointer ${
          activeTopic && !isMobile && "lg:hidden"
        } ${!activeTopic && !isMobile && "lg:block"} ${
          activeTopic && isMobile && "hidden"
        }`}
        onClick={() => handleOpen()}
      />
      <div className="container flex relative">
        <Topic
          key={`topic-${articleSlug}`}
          isMobile={isMobile}
          active={activeTopic}
          setActive={handleClose}
          disease={disease}
          articleSlug={articleSlug}
          articles={articles}
        />

        <article className="flex-[7_1_0%] px-[16px]">
          <header className={`${activeTopic ? "pt-8" : ""} pb-4`}>
            <div className="font-semibold text-xl">
              <Link href={`/tag/${slugDisease}`}>
                <a>{nameDisease}</a>
              </Link>
              <span> / </span>
              <Link href={`/${slugDisease}/${article.slug}`}>
                <a>{article.title}</a>
              </Link>
            </div>
          </header>
          <main>
            <h1 className="text-4xl">{article.title}</h1>
            <div className="mt-2 text-[#4d626e]">
              <time>{format(new Date(article.updatedAt), "dd/MM/yyyy")}</time>
              <span> - {readTime} phút đọc</span>
            </div>
            <div
              className="single"
              dangerouslySetInnerHTML={{ __html: content.toString() }}
            />
          </main>
        </article>

        <TableContent active={activeTopic} headings={headings} />
      </div>
    </div>
  );
};

export default Detail;
