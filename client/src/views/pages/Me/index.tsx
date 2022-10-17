export default function Me() {
  return (
    <div className="container grid grid-cols-3 my-8 gap-8">
      <aside className="col-span-1">
        <div className="border rounded-md shadow-md p-4">Me</div>
      </aside>
      <main className="col-span-2">
        <div className="border rounded-md shadow-md p-4">List Articles</div>
      </main>
    </div>
  );
}
