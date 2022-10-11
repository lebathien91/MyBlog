interface TableContentProps {
  active: boolean;
}

const TableContent = ({ active }: TableContentProps) => {
  return (
    <aside className="flex-[2_1_0%] hidden md:block">
      <nav className={`${active ? "pt-8" : ""}`}>
        <h2 className="py-4">Table Content</h2>
        <ol>
          <li>
            <a href="#">Table content 1</a>
          </li>
          <li>
            <a href="#">Table content 2</a>
          </li>
          <li>
            <a href="#">Table content 3</a>
          </li>
          <li>
            <a href="#">Table content 4</a>
          </li>
        </ol>
      </nav>
    </aside>
  );
};

export default TableContent;
