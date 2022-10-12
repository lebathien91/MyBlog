import { ChangeEvent, FormEvent } from "react";

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLOptionElement
>;
export type FormSubmit = FormEvent<HTMLFormElement>;

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  avatar: string;
  role: number;
  root: boolean;
  isChecked?: boolean;
}

export interface ICategory {
  _id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  isChecked?: boolean;
}

export interface ITag {
  _id: string;
  name: string;
  thumbnail: string;
  description: string;
  category: string | ICategory;
  createdAt?: string;
  updatedAt?: string;
  deleted?: string | null;
  isChecked?: boolean;
}

export interface IArticle {
  _id?: string;
  title: string;
  tag: string | ITag;
  description: string;
  content: string;
  user?: string | IUser;
  createdAt?: string;
  updatedAt?: string;
  isChecked?: boolean;
}
