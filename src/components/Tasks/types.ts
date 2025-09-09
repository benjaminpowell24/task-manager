export type TaskType = {
  id: number;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
}

export type TaskModalType = {
  isModalOpen: boolean, 
  handleModalClose: () => void, 
  taskId: number|null, 
  mode: "edit" | "create"
 }