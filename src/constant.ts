// src/config/appwrite.config.ts

const {
  VITE_APPWRITE_PROJECT_ID,
  VITE_APPWRITE_PROJECT_NAME,
  VITE_APPWRITE_ENDPOINT,
  VITE_APPWRITE_DATABASE_ID,
  VITE_APPWRITE_PROJECTS_COLLECTION_ID,
} = import.meta.env;


/**
 * Fail fast if env vars are missing
 */
function required(name: string, value?: string) {
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }
  return value;
}

export const APPWRITE_CONFIG = {
  endpoint: required("VITE_APPWRITE_ENDPOINT", VITE_APPWRITE_ENDPOINT),
  projectId: required("VITE_APPWRITE_PROJECT_ID", VITE_APPWRITE_PROJECT_ID),
  projectName: required(
    "VITE_APPWRITE_PROJECT_NAME",
    VITE_APPWRITE_PROJECT_NAME
  ),

  databaseId: required("VITE_APPWRITE_DATABASE_ID", VITE_APPWRITE_DATABASE_ID),
  projectsCollectionId: required(
    "VITE_APPWRITE_PROJECTS_COLLECTION_ID",
    VITE_APPWRITE_PROJECTS_COLLECTION_ID
  ),
} as const;



export const PAGE_SIZE = 10;
