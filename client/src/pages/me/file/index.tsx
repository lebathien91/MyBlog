import React, { ReactElement } from "react";
import Admin from "../../../views/Layout/Admin";

export default function FilesPage() {
  return <>FilesPage</>;
}

FilesPage.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
