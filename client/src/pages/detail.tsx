import { ReactElement } from "react";

import Layout from "../views/layout.";
import Detail from "../views/pages./Detail";

export default function DetailPage() {
  return <Detail />;
}

DetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
