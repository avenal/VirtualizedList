type Id = number;
type Email = string;
type Url = string;
type FirstName = string;
type LastName = string;
type Gender = "Female" | "Male";

export interface User {
  id: Id;
  first_name: FirstName;
  last_name: LastName;
  email: Email;
  gender: Gender;
  avatar: Url | null;
}