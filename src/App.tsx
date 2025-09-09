import TaskList from "./components/Tasks";
import Filter from "./components/Filter";
import { useTaskContext } from "./context/TaskContext";
import CreateTaskButton from "./components/Tasks/CreateTaskButton";
import Search from "./components/Search";
import { useState } from "react";
import TaskModal from "./components/Tasks/TaskModal";

function App() {
  const { taskList } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"edit" | "create">("create");
  const [taskId, setTaskId] = useState<number | null>(null);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTaskId(null);
    setMode("create");
  };

  const handleEdit = (taskId: number) => {
    setMode("edit");
    setIsModalOpen(true);
    setTaskId(taskId);
  };

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen p-6 mx-auto ">
        <h1 className="text-4xl font-bold text-foreground mb-2 text-center">
          Task Manager
        </h1>
        <p className="text-muted-foreground text-lg text-center">
          Organize and Manage your tasks efficiently
        </p>
        {isModalOpen && (
          <TaskModal
            isModalOpen={isModalOpen}
            handleModalClose={handleModalClose}
            mode={mode}
            taskId={taskId && taskId}
          />
        )}
        <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-2">
          <div className="md:max-w-3xl w-full">
            <Search />
          </div>
          <div className="flex items-center gap-2 w-full justify-between md:justify-end md:w-fit">
            <Filter />
            <CreateTaskButton handleModalOpen={handleModalOpen} />
          </div>
        </div>
        <TaskList tasks={taskList} handleEdit={handleEdit} />
      </div>
    </div>
  );
}

export default App;
