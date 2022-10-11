import { ReactNode, useContext } from "react";
import Layout from ".";
import Loading from "../../components/Loading";
import Login from "../../pages/login";
import { GlobalContext } from "../../store/GlobalState";
import Profile from "../Pages/Profile";
import Dashboard from "./Dashboard";

export default function Admin({
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
