import { user } from "../interface";

export const users: user[] = [
  {
    id: 1,
    username: "Root",
    email: "root@email.com",
    avatar:
      "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    role: 2, //Admin
    root: true,
  },
  {
    id: 2,
    username: "Admin",
    email: "admin@email.com",
    avatar:
      "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    role: 2, //Admin
    root: false,
  },
  {
    id: 3,
    username: "Editor",
    email: "editor@email.com",
    avatar:
      "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    role: 1, //Editor
    root: false,
  },
  {
    id: 4,
    username: "User",
    email: "user@email.com",
    avatar:
      "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    role: 0, //User
    root: false,
  },
];
