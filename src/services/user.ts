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
      const user = await account.get();

      if (!user.emailVerification) {
        await account.deleteSession("current");
        return { data: null, error: "Please verify your email first." };
      }

      return { data: session as unknown as ISession, error: null };
    } catch (err: any) {
      return { data: null, error: err?.message || "Login failed" };
    }
  }

  async register(
    payload: IRegisterPayload
  ): Promise<IServiceResult<{ user: IUser }>> {
    try {
      const created = await account.create(
        ID.unique(),
        payload.email,
        payload.password,
        payload.name
      );

      // temp login (needed to send verification)
      await account.createEmailPasswordSession(payload.email, payload.password);

      // send verification email
      await account.createVerification(`${window.location.origin}/verify`);

      // logout immediately (so they cannot use app before verifying)
      await account.deleteSession("current");

      return {
        data: { user: created as unknown as IUser },
        error: null,
      };
    } catch (err: any) {
      return { data: null, error: err?.message || "Registration failed" };
    }
  }

  async resendVerification(): Promise<IServiceResult<boolean>> {
    try {
      await account.createVerification(`${window.location.origin}/verify`);
      return { data: true, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: err?.message || "Failed to resend verification",
      };
    }
  }

  async confirmEmailVerification(
    userId: string,
    secret: string
  ): Promise<IServiceResult<boolean>> {
    try {
      await account.updateVerification(userId, secret);
      return { data: true, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: err?.message || "Email verification failed",
      };
    }
  }

  async getCurrentUser(): Promise<IServiceResult<IUser>> {
    try {
      const user = await account.get();
      if (!user.emailVerification) {
        await account.deleteSession("current");
        return { data: null, error: "Please verify your email first." };
      }
      return { data: user as unknown as IUser, error: null };
    } catch (err: any) {
      return { data: null, error: err?.message || "Failed to get user" };
    }
  }

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
