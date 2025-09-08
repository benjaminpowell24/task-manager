import { useTaskContext } from "../../context/TaskContext";
import type { TaskType } from "../Tasks/types";
import { Filter as FilterIcon } from "iconsax-reactjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Filter = () => {
  const { setTasks } = useTaskContext();

  const handleChange = (value: string) => {

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const filteredTasks = tasks.filter((task: TaskType) => {
      if (value === "all") return true;
      return task.priority === value;
    });

    setTasks(filteredTasks);
  }

  return (
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[120px]">
          <FilterIcon size={18}/>
          <SelectValue/>
       </SelectTrigger>
       <SelectContent>
         <SelectItem value="all">All</SelectItem>
         <SelectItem value="low">Low</SelectItem>
         <SelectItem value="medium">Medium</SelectItem>
         <SelectItem value="high">High</SelectItem>
       </SelectContent>
     </Select>
  )
}

export default Filter