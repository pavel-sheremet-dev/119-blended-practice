export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// export interface PostFormData {
//   title: string;
//   body: string;
// }

export type PostFormData = Pick<Post, "title" | "body">;
