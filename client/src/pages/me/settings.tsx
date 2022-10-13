import { ReactElement } from "react";
import AuthRouter from "@/layout/AuthRouter";

export default function SettingsPage() {
  return <>SettingsPage</>;
}

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  const user: any = {
    username: "UserName",
    email: "username@email.com",
    role: "user",
    root: true,
  };

  if (!user) return <div>Login</div>;

  if (user.root) return <AuthRouter>{page}</AuthRouter>;

  return <div>403</div>;
};
