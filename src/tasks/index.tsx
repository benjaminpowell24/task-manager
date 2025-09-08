import Task from "./components/Task"

const list = [
 {
  id: 1,
  name: 'Task 1',
  description: 'Description for Task 1',
  priority: 'High'
 },
 {
  id: 2,
  name: 'Task 2',
  description: 'Description for Task 2',
  priority: 'Medium'
 },
 {
  id: 3,
  name: 'Task 3',
  description: 'Description for Task 3',
  priority: 'Low'
 }
]

const TaskList = () => {
  return (
      <div className="max-w-xl mx-auto mt-6">
        <ul className="flex flex-col items-center space-y-6">
        {list.map(task => (
          <Task key={task.id} {...task} />
        ))}
        </ul>
      </div>
  )
}

export default TaskList