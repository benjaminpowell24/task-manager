import { Trash, Edit } from "iconsax-reactjs"

export const Task = ({name, description, priority}: {
 name: string
 description: string
 priority: string
}) => {
  const priorityColors: Record<string, string> = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500'
  }

  return (
    <li className="w-full bg-white rounded-lg shadow-md p-4">
     <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${priorityColors[priority]}`}></div>
          <p className="text-sm text-gray-500">{priority}</p>
        </div>
     </div>
     <p className="mt-2">{description}</p>
     <div className="flex items-center justify-between mt-2">
      <button className="bg-gray-100 text-gray-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white hover: cursor-pointer">
        <Edit />
      </button>
      <button className="bg-gray-100 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white hover:cursor-pointer">
        <Trash/>
      </button>
     </div>
    </li>
  )
}

export default Task