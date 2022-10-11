import { ChangeEvent, FormEvent } from "react";

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLOptionElement
>;
export type FormSubmit = FormEvent<HTMLFormElement>;

export interface Iuser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  role: number;
  root: boolean;
  isChecked?: boolean;
}

export interface Icategory {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  isChecked?: boolean;
}

export interface Itag {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  category: string | Icategory;
  createdAt: string;
  updatedAt: string;
  deleted?: string | null;
  isChecked?: boolean;
}

export interface Iarticle {
  _id: string;
  title: string;
  slug: string;
  tag: string | number;
  description: string;
  content: string;
  user: string | Iuser;
  isChecked?: boolean;
}
