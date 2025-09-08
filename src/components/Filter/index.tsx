import { useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { TaskType } from "../Tasks/types";
import { Filter as FilterIcon } from "iconsax-reactjs";
import { FilterOptionsType } from "./type";

const Filter = () => {
  const { setTasks } = useTaskContext();
  const [priority, setPriority] = useState<FilterOptionsType>("all");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as FilterOptionsType);

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const filteredTasks = tasks.filter((task: TaskType) => {
      if (e.target.value === "all") return true;
      return task.priority === e.target.value;
    });

    setTasks(filteredTasks);
  }

  return (
    <div className="bg-gray-100 text-gray-500 px-2 py-2 rounded flex items-center gap-2: hover:bg-gray-200 cursor-pointer">
       <button className="flex items-center gap-1 ">
          <FilterIcon size={18}/>
       </button>
     <select name="priority" id="priority" aria-label="Priority" className="border-0 outline-0" value={priority} onChange={handleChange}>
          <option value="all">All</option>
           <option value="low">Low</option>
           <option value="medium">Medium</option>
           <option value="high">High</option>
         </select>
    </div>
  )
}

export default Filter