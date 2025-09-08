import Task from "./components/Task"
import { Task as TaskType } from "./components/types"

const TaskList = ({ tasks }: { tasks: TaskType[] }) => {

  return (
      <div className="max-w-xl mx-auto mt-6">
        <ul className="flex flex-col items-center space-y-6">
        {tasks.map(task => (
          <Task key={task.id} {...task} />
        ))}
        </ul>
      </div>
  )
}

export default TaskList