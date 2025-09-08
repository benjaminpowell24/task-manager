import { useState } from "react";
import TaskList from "./tasks/"
import { Add } from "iconsax-reactjs"
import TaskModal from "./tasks/components/TaskModal";
  

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="bg-gray-100">
    <div className="min-h-screen p-6 mx-auto max-w-xl">
        {isModalOpen && <TaskModal handleModalClose={handleModalClose} />}
        <h1 className="text-3xl font-bold text-center">Task Manager App</h1>
        <button className="bg-blue-500 text-white px-2 py-2 rounded flex items-center gap-1 hover:bg-blue-600 cursor-pointer" onClick={handleModalOpen}>
          <Add />
          <span>Add Task</span>
          </button>
        <TaskList />
    </div>

    </div>
  )
}

export default App
