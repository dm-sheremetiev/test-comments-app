import { IUser } from "./User";

export interface IComment {
  id: number;
  postId: number;
  body: string;
  user: IUser;
}
