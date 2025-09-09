import { useState, useRef, useEffect } from "react";
import { useTaskContext } from "../../context/TaskContext";
import type { TaskModalType, TaskType } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TaskModal = ({
  isModalOpen,
  handleModalClose,
  mode = "create",
  taskId,
}: TaskModalType) => {
  const { setTasks } = useTaskContext();
  const [input, setInput] = useState<TaskType>({
    id: Date.now(),
    name: "",
    description: "",
    priority: "low",
  });
  const backdropRef = useRef<HTMLDivElement>(null);

  type priorityType = "low" | "medium" | "high";

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (e.target) {
      const { name, value } = e.target;
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = () => {
    setInput({ id: Date.now(), name: "", description: "", priority: "low" });
    const tasks = localStorage.getItem("tasks");
    localStorage.setItem(
      "tasks",
      JSON.stringify([input, ...JSON.parse(tasks || "[]")]),
    );
    setTasks((prev: TaskType[]) => [input, ...prev]);
    handleModalClose();
  };

  const handleUpdate = () => {
    const tasks = localStorage.getItem("tasks");
    const updatedTasks = [
      input,
      ...JSON.parse(tasks || "[]").filter(
        (task: TaskType) => task.id !== taskId,
      ),
    ];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    handleModalClose();
  };

  const handleCancel = () => {
    return handleModalClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (backdropRef.current && backdropRef.current === target) {
        handleModalClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, handleModalClose]);

  useEffect(() => {
    if (mode === "edit") {
      const task = localStorage.getItem("tasks");
      const currentTask = task
        ? JSON.parse(task).find((t: TaskType) => t.id === taskId)
        : null;
      if (currentTask) {
        setInput(currentTask);
      } else {
        mode = "create";
      }
    }
  }, [mode, taskId]);

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      ref={backdropRef}
    >
      <div className="bg-white border border-gray-50 rounded-lg shadow-lg max-w-sm md:max-w-md lg:max-w-2xl w-full py-5 ">
        <div className="flex flex-col space-y-4">
          <h1 className="text-xl font-semibold text-center my-4">
            {mode === "edit" ? "Edit Task" : "Create Task"}
          </h1>
          <div className="flex flex-col max-w-sm md:max-w-lg px-2 md:mx-auto w-full py-4">
            <div className="flex flex-col items-center gap-2 lg:grid grid-cols-3">
              <div className="col-span-2 flex flex-col">
                <Label
                  htmlFor="name"
                  className="font-normal text-gray-500 mb-2"
                >
                  Task Title
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Task Title"
                  className="border p-2 rounded"
                  value={input.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="priority"
                  className="font-normal text-gray-500 mb-2"
                >
                  Priority
                </Label>
                <Select
                  defaultValue="low"
                  name="priority"
                  onValueChange={(value) =>
                    setInput((prev) => ({
                      ...prev,
                      priority: value as priorityType,
                    }))
                  }
                  value={input.priority}
                >
                  <SelectTrigger id="priority" className="hover:cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent data-select-dropdown>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <Label
                htmlFor="description"
                className="font-normal text-gray-500 mb-2"
              >
                Description
              </Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Task description (Optional)"
                className="border p-2 rounded field-sizing-content"
                value={input.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-center my-4">
            <button
              type="submit"
              onClick={mode === "edit" ? handleUpdate : handleCreate}
              className={`${
                input.name
                  ? "bg-blue-500 hover:cursor-pointer"
                  : "bg-gray-300 hover:cursor-not-allowed"
              } text-white py-2 px-4 rounded `}
              disabled={!input.name}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
