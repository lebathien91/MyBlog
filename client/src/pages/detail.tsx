import { ReactElement } from "react";

import Layout from "../views/Layout";
import Detail from "../views/Pages/Detail";

export default function DetailPage() {
  return <Detail />;
}

DetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
