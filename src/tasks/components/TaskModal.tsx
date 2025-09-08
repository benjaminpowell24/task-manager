import { useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { Task as TaskType} from "./types"; 

const TaskModal = ({handleModalClose}: {handleModalClose: () => void}) => {
  const {setTasks} = useTaskContext();
  const [input, setInput] = useState<TaskType>({ id: Date.now(), name: "", description: "", priority: "low" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = () => {
    console.log("Task created:", input);
    setInput({ id: Date.now(), name: "", description: "", priority: "low" });
    const tasks = localStorage.getItem("tasks");
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(tasks || "[]"), input]));
    setTasks((prev: TaskType[]) => [...prev, input]);
    handleModalClose(); 
  }

  const handleCancel = () => {
    return handleModalClose();
  }

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true">
    <div className="bg-white border border-gray-50 rounded-lg shadow-lg max-w-sm md:max-w-md lg:max-w-2xl w-full py-5">
     <div className="flex flex-col space-y-4">
     <h1 className="text-xl font-semibold text-center my-4">Create Task</h1>
     <div className="flex flex-col max-w-sm md:max-w-lg px-2 md:mx-auto w-full py-4">
      <div className="flex flex-col gap-2 lg:grid grid-cols-3">
      <div className="col-span-2 flex flex-col">
         <label htmlFor="name" className="font-normal text-gray-500">Task Title</label>
         <input type="text" name="name" id="name" placeholder="Task Title" className="border p-2 rounded" value={input.name} onChange={handleChange} autoComplete="off"/>
      </div>
      <div className="flex flex-col">
         <label htmlFor="priority" className="font-normal text-gray-500">Priority</label>
         <select name="priority" id="priority" aria-label="Priority" className="border p-2 rounded" value={input.priority} onChange={handleChange}>
           <option value="low">Low</option>
           <option value="medium">Medium</option>
           <option value="high">High</option>
         </select>
        </div>
     </div>
     <div className="flex flex-col mt-2">
         <label htmlFor="description" className="font-normal text-gray-500">Description</label>
         <textarea name="description" id="description" placeholder="Task description (Optional)" className="border p-2 rounded field-sizing-content" value={input.description} onChange={handleChange}/>
      </div>
   
     </div>
      <div className="flex gap-4 justify-center my-4">
     <button type="submit" onClick={handleSubmit} className={`${input.name ? "bg-blue-500 hover:cursor-pointer" : "bg-gray-300 hover:cursor-not-allowed"} text-white py-2 px-4 rounded `} disabled={!input.name}>Create Task</button>
     <button type="button" onClick={handleCancel} className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:cursor-pointer">Cancel</button>
      </div>
      
    </div>
    </div>
    
   </div>
  )
}

export default TaskModal