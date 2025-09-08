import TaskList from "./components/Tasks"
import Filter from "./components/Filter";
import { useTaskContext } from "./context/TaskContext";
import CreateTaskButton from "./components/Tasks/CreateTaskButton";
import Search from "./components/Search";
  

function App() {
  const { taskList } = useTaskContext();

  return (
    <div className="bg-gray-100">
    <div className="min-h-screen p-6 mx-auto ">
        <h1 className="text-4xl font-bold text-foreground mb-2 text-center">Task Manager</h1>
        <p className="text-muted-foreground text-lg text-center">Organize and Manage your tasks efficiently</p>
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="max-w-3xl w-full">
            <Search />
          </div>
          <div className="flex gap-2 items-center">
            <Filter />
            <CreateTaskButton />
          </div>
        </div>
        <TaskList tasks={taskList} />
    </div>

    </div>
  )
}

export default App
