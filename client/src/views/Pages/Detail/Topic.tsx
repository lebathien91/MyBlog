import { MdClose } from "react-icons/md";

interface TopicProps {
  isMobile: boolean;
  active: boolean;
  setActive: Function;
}

const Topic = ({ isMobile, active, setActive }: TopicProps) => {
  return (
    <aside
      className={`flex-[3_1_0%] bg-white absolute lg:relative left-0 top-0 bottom-0 ${
        isMobile && active && "block"
      } ${!isMobile && !active && "hidden"} ${
        active && !isMobile && "hidden lg:block"
      }`}
    >
      <nav className="px-4 md:px-2 lg:px-1 min-w-[230px] sticky top-[55px]">
        <MdClose
          size="1.5rem"
          className="absolute right-4 top-4 cursor-pointer"
          onClick={() => setActive(false)}
        />
        <h2 className="pt-8 pb-4">Chuyên đề: Topic</h2>
        <ul>
          <li>
            <a href="#">Chuyên đề 1</a>
          </li>
          <li>
            <a href="#">Chuyên đề 1</a>
          </li>
          <li>
            <a href="#">Chuyên đề 1</a>
          </li>
          <li>
            <a href="#">Chuyên đề 1</a>
          </li>
          <li>
            <a href="#">Chuyên đề 1</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Topic;
