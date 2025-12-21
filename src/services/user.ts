import { account, ID } from "../lib/appwrite";
import type {
  ILoginPayload,
  IRegisterPayload,
  IServiceResult,
  ISession,
  IUser,
} from "../types";

class UserService {
  async login(payload: ILoginPayload): Promise<IServiceResult<ISession>> {
    try {
      const session = await account.createEmailPasswordSession(
        payload.email,
        payload.password
      );
      return { data: session, error: null };
    } catch (err: any) {
      return { data: null, error: err?.message || "Login failed" };
    }
  }

  async register(
    payload: IRegisterPayload,
    autoLogin: boolean = true
  ): Promise<IServiceResult<{ user: IUser; session?: ISession }>> {
    try {
      const created = await account.create(
        ID.unique(),
        payload.email,
        payload.password,
        payload.name
      );

      let session: ISession | undefined;

      if (autoLogin) {
        session = await account.createEmailPasswordSession(
          payload.email,
          payload.password
        );
      }

      // created is a "User" model in Appwrite typings (may vary by SDK version)
      return {
        data: { user: created as unknown as IUser, session },
        error: null,
      };
    } catch (err: any) {
      return { data: null, error: err?.message || "Registration failed" };
    }
  }

  async getCurrentUser(): Promise<IServiceResult<IUser>> {
    try {
      const user = await account.get();
      return { data: user, error: null };
    } catch (err: any) {
      return { data: null, error: err?.message || "Failed to get user" };
    }
  }

  /** Logout current session */
  async logout(): Promise<IServiceResult<boolean>> {
    try {
      await account.deleteSession("current");
      return { data: true, error: null };
    } catch (err: any) {
      return { data: null, error: err?.message || "Logout failed" };
    }
  }
}

const userService = new UserService();
export default userService;
