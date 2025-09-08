export type Task = {
  id: number;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
}