import TaskList from "./tasks/TaskList"

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 mx-auto">
    <h1 className="text-3xl font-bold text-center">Task Manager App</h1>
    <TaskList />
    </div>
  )
}

export default App
