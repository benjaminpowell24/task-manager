import { useContext, useState, createContext, useEffect } from "react"

const TaskContext = createContext<any>(null);

export const useTaskContext = () => {
  return useContext(TaskContext);
}

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = localStorage.getItem("tasks")
      const data = JSON.parse(response || "[]")
      setTasks(data)
      setIsLoading(false)
    }
    fetchTasks()
  }, [])

  return (
    <TaskContext.Provider value={{ tasks, setTasks, isLoading }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContext