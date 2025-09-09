import { Trash, Edit } from "iconsax-reactjs"
import type { TaskType } from "./types";
import { useTaskContext } from "../../context/TaskContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {GrabberIcon} from '@primer/octicons-react'

interface TaskProps {
  task: TaskType;
  index: number;
  draggedTaskId: number | null;
  dragOverIndex: number | null;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: () => void;
  handleEdit: (taskId: number) => void;
}

export const Task = ({task, index, draggedTaskId, dragOverIndex, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd, handleEdit}: TaskProps) => {
  const {setTasks} = useTaskContext();
  const {id, name, description, priority} = task;

  const priorityColors: Record<string, string> = {
    low: 'bg-red-500',
    medium: 'bg-yellow-500',
    high: 'bg-green-500'
  }

  const handleDelete = () => {
    const tasks = localStorage.getItem("tasks");
    const updatedTasks = JSON.parse(tasks || "[]").filter((task: TaskType) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  return (
    <div className={`w-full bg-white rounded-lg shadow-md p-4 ${draggedTaskId === task.id && "opacity-50 scale-95 bg-black/50"} ${dragOverIndex === index && "ring-2 ring-blue-500 ring-offset-2"} overflow-hidden flex flex-col justify-between hover: cursor-grab `} draggable onDragStart={(e) => onDragStart(e, task.id)} onDragOver={(e) => onDragOver(e, index)} onDragLeave={onDragLeave} onDrop={(e) => onDrop(e, index)} onDragEnd={onDragEnd} data-testid="draggable">
     <div className="flex flex-row items-center gap-2 mb-2">
      <GrabberIcon size={18} />
      <Tooltip>
      <TooltipTrigger>
        <h2 className="text-xl font-bold hover: cursor-default">{name.length > 40 ? `${name.substring(0, 40)}...` : name}</h2>
      </TooltipTrigger>
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
      </Tooltip>
     </div>
     <div className="flex items-center space-x-2 my-2">
          <div className={`w-2.5 h-2.5 rounded-full ${priorityColors[priority]}`}></div>
          <p className="text-sm text-gray-500">{priority.charAt(0).toUpperCase() + priority.slice(1)}</p>
        </div>
     <Tooltip>
      <TooltipTrigger asChild>
        <p className="my-2 w-fit hover: cursor-default">{description.length > 50 ? `${description.substring(0, 50)}...` : description}</p>
      </TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
      </Tooltip>
     <div className="flex items-center justify-between mt-2">
      <button title="edit" className="bg-gray-100 text-gray-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white hover: cursor-pointer" onClick={() => handleEdit(task.id)}>
        <Edit />
      </button>
      <button title="delete" className="bg-gray-100 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white hover:cursor-pointer" onClick={handleDelete}>
        <Trash/>
      </button>
     </div>
    </div>
  )
}

export default Task