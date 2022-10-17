import { ReactNode, useContext } from "react";
import Layout from "@/layout/index";
import Loading from "@/components/Loading";
import Login from "@/pages/login";
import { GlobalContext } from "@/store/GlobalState";
import Profile from "@/views/pages/Me";
import Admin from "@/layout/Admin";

export default function AuthRouter({
  children,
  isUser,
}: {
  children: ReactNode;
  isUser?: boolean;
}) {
  const { state } = useContext(GlobalContext);

  const auth = state.auth;
  const user = auth?.user;

  if (auth.loading) return <Loading />;

  if (!user) return <Login />;

  if (user.role === "admin" || user.root) return <Admin>{children}</Admin>;

  if (isUser)
    return (
      <Layout>
        <div className="container my-12">{children}</div>
      </Layout>
    );

  return <>403</>;
}
