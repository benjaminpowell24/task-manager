import Task from "./components/Task"
import { TaskType } from "./components/types"

const TaskList = ({ tasks }: { tasks: TaskType[] }) => {

 if(tasks.length === 0) {
   return <div className="rounded-lg shadow-md p-4 fixed top-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xl w-full">
    <p className="text-gray-500 text-center">You have no tasks scheduled</p>
   </div>;
 }

  return (
      <div className="max-w-xl mx-auto mt-6">
        <ul className="flex flex-col items-center space-y-6 overflow-auto">
        {tasks.map(task => (
          <Task key={task.id} {...task} />
        ))}
        </ul>
      </div>
  )
}

export default TaskList