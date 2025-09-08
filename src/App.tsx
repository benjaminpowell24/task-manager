import { useState } from "react";
import TaskList from "./components/Tasks"
import { Add, Filter } from "iconsax-reactjs"
import TaskModal from "./components/Tasks/TaskModal";
import { useTaskContext } from "./context/TaskContext";
  

function App() {
  const { isLoading, tasks } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100">
    <div className="min-h-screen p-6 mx-auto max-w-xl">
        {isModalOpen && <TaskModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}/>}
        <h1 className="text-3xl font-bold text-center my-4">Task Manager App</h1>
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-2 py-2 rounded flex items-center gap-1 hover:bg-blue-600 cursor-pointer" onClick={handleModalOpen}>
            <Add />
            <span>Add Task</span>
          </button>
          <button className="bg-gray-100 text-gray-500 px-2 py-2 rounded flex items-center gap-1 hover:bg-gray-200 cursor-pointer">
            <Filter />
            <span>Filter Tasks</span>
          </button>
        </div>
        <TaskList tasks={tasks} />
    </div>

    </div>
  )
}

export default App
