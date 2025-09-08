import { Trash, Edit } from "iconsax-reactjs"
import { TaskType} from "./types"
import { useState } from "react";
import TaskModal from "./TaskModal";
import { useTaskContext } from "../../context/TaskContext";

export const Task = (task: TaskType) => {
  const {setTasks} = useTaskContext();
  const {id, name, description, priority} = task;
  const [isEditing, setIsEditing] = useState(false);

  const priorityColors: Record<string, string> = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleModalClose = () => {
    setIsEditing(false);
  }

  const handleDelete = () => {
    const tasks = localStorage.getItem("tasks");
    const updatedTasks = JSON.parse(tasks || "[]").filter((task: TaskType) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  return (
    <li className="w-full bg-white rounded-lg shadow-md p-4">
      {isEditing && <TaskModal isModalOpen={isEditing} handleModalClose={handleModalClose} taskId={id} mode="edit" />}
     <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${priorityColors[priority]}`}></div>
          <p className="text-sm text-gray-500">{priority}</p>
        </div>
     </div>
     <p className="mt-2">{description}</p>
     <div className="flex items-center justify-between mt-2">
      <button className="bg-gray-100 text-gray-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white hover: cursor-pointer" onClick={handleEdit}>
        <Edit />
      </button>
      <button className="bg-gray-100 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white hover:cursor-pointer">
        <Trash/>
      </button>
     </div>
    </li>
  )
}

export default Task