import { Client, Account, Databases, ID } from "appwrite";
import { APPWRITE_CONFIG } from "../constant";

export const client = new Client()
  .setEndpoint(
    (APPWRITE_CONFIG.endpoint as string) ||
      "https://fra.cloud.appwrite.io/v1",
  )
  .setProject(APPWRITE_CONFIG.projectId as string);

export const databases = new Databases(client);

export const account = new Account(client);



export { ID };
