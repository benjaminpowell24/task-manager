import Task from "./Task"
import type { TaskType } from "./types";

const TaskList = ({ tasks }: { tasks: TaskType[] }) => {

 if(tasks.length === 0) {
   return (<div className="rounded-lg shadow-md p-4 max-w-xl w-full mt-6 flex justify-center items-center mx-auto bg-white">
    <p className="text-gray-500 text-center">You have no tasks scheduled</p>
   </div>)
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