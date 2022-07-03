import { User } from "./types";

const API_ROOT =
  "https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com";
const API_PATHS = {
  users: "/users.json",
} as const;

type ApiPathsKeys = keyof typeof API_PATHS;
type ApiPathsValues = typeof API_PATHS[ApiPathsKeys];
type ApiUrl = `${typeof API_ROOT}${ApiPathsValues}`;

export const fetchUsers = async () => {
  const url: ApiUrl = `${API_ROOT}${API_PATHS.users}`;
  const response = await fetch(url);
  const json: User[] = await response.json();
  return json;
};


