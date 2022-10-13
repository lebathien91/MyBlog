import { ReactNode, useContext } from "react";
import Layout from "@/layout/index";
import Loading from "@/components/Loading";
import Login from "@/pages/login";
import { GlobalContext } from "@/store/GlobalState";
import Profile from "@/views/pages/Profile";
import Dashboard from "@/layout/Dashboard";

export default function AuthRouter({
  children,
  isAuth,
  me,
}: {
  children: ReactNode;
  isAuth?: boolean;
  me?: boolean;
}) {
  const { state } = useContext(GlobalContext);

  const auth = state.auth;
  const user = auth?.user;

  if (auth.loading) return <Loading />;

  if (!user) return <Login />;

  if (user.role === "admin") return <Dashboard>{children}</Dashboard>;

  if (isAuth)
    return (
      <Layout>
        <div className="container my-12">{me ? <Profile /> : children}</div>
      </Layout>
    );

  return <>403</>;
}
