import { Add } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";

const CreateTaskButton = ({
  handleModalOpen,
}: {
  handleModalOpen: () => void;
}) => {
  return (
    <div>
      <Button
        title="add task"
        className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        onClick={handleModalOpen}
      >
        <Add />
        <span>Add Task</span>
      </Button>
    </div>
  );
};

export default CreateTaskButton;
