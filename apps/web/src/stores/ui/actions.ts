import { User } from "@align/api-types";

export type UIStoreAction = 
  | { kind: "setTheme"}
  | { kind: "setLanguage"}
  | { kind: "setUser"; user?: User}