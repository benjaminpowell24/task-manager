import Task from "./Task"

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
    <div>
      {list.map(task => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  )
}

export default TaskList