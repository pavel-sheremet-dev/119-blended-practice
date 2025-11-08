import { Note, Tag } from "@/types/note";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export interface Credentials {
  email: string;
  password: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesProps {
  searchText: string;
  page: number;
  tag: "" | Tag;
}

export interface CheckSession {
  success: boolean;
}
