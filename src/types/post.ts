export interface Post {
  userId: number;
  id: number;
  body: string;
  title: string;
}

export type PostFormData = Pick<Post, "title" | "body">;
