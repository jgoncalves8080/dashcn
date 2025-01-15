import { Comment } from "../Comment/Comment";
import { Task } from "../Task/Task";

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "delayed" | "completed";
  progress: number;
  responsible: string;
  createdAt: string;
  tasks: Task[];
  comments: Comment[];
}
