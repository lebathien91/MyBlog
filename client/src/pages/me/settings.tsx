import React, { ReactElement } from "react";
import Admin from "../../views/Layout/Admin";

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

  if (user.root) return <Admin>{page}</Admin>;

  return <div>403</div>;
};
