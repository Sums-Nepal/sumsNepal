
import type {  Models } from "appwrite";
export interface IServiceResult<T> {
  data: T | null;
  error: string | null;
}

/** ✅ Payloads */
export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export type IUser = Models.User<Models.Preferences>;
export type ISession = Models.Session;