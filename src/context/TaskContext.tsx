import type { FilterOptionsType } from "@/components/Filter/type";
import type { TaskType } from "@/components/Tasks/types";
import { useContext, useState, createContext, useMemo } from "react";

const TaskContext = createContext<any>(null);

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [priority, setPriority] = useState<FilterOptionsType>("all");

  const taskList = useMemo(() => {
    return tasks
      .filter(
        (task) =>
          task.name
            .trim()
            .toLocaleLowerCase()
            .includes(searchTerm.trim().toLocaleLowerCase()) ||
          task.description
            .toLocaleLowerCase()
            .trim()
            .includes(searchTerm.toLocaleLowerCase().trim()),
      )
      .filter((task) => {
        if (priority === "all") return true;
        return task.priority === priority;
      });
  }, [tasks, searchTerm, priority]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        priority,
        setPriority,
        searchTerm,
        setSearchTerm,
        taskList,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
