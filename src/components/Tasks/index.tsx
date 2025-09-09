import React, { useState } from "react";
import Task from "./Task";
import type { TaskType } from "./types";
import { useTaskContext } from "@/context/TaskContext";

const TaskList = ({
  tasks,
  handleEdit,
}: {
  tasks: TaskType[];
  handleEdit: (taskId: number) => void;
}) => {
  const { setTasks } = useTaskContext();

  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: number,
  ) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    console.log("drop", index);

    if (draggedTaskId !== null) {
      const tasks = localStorage.getItem("tasks");
      const taskList = JSON.parse(tasks || "[]");
      const draggedTaskIndex = taskList.findIndex(
        (task: TaskType) => task.id === draggedTaskId,
      );
      const [removed] = taskList.splice(draggedTaskIndex, 1);
      taskList.splice(index, 0, removed);
      localStorage.setItem("tasks", JSON.stringify(taskList));
      setTasks(taskList);
      setDragOverIndex(null);
      setDraggedTaskId(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverIndex(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg shadow-md p-4 max-w-xl w-full mt-6 flex justify-center items-center mx-auto bg-white">
        <p className="text-gray-500 text-center">You have no tasks scheduled</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          draggedTaskId={draggedTaskId}
          dragOverIndex={dragOverIndex}
          index={index}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
