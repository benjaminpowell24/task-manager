export const Task = ({name, description, priority}: {
 name: string
 description: string
 priority: string
}) => {
  return (
    <div>
     <h1>{name}</h1>
     <p>{description}</p>
     <p>{priority}</p>
    </div>
  )
}

export default Task