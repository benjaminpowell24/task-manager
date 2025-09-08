import { Add } from 'iconsax-reactjs'
import {useState} from 'react'
import TaskModal from './TaskModal';

const CreateTaskButton = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      {isModalOpen && <TaskModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}/>}
     <button className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-600 cursor-pointer" onClick={handleModalOpen}>
            <Add size={18}/>
            <span>Add Task</span>
          </button>
    </div>
  )
}

export default CreateTaskButton