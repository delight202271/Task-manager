
import { Trash2, SquarePen, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface TaskCardProps {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  completed: boolean;
  onDelete: (id: string) => void;
}

const TaskCard = ({
  _id,
  title,
  description,
  dueDate,
  category,
  completed,
  onDelete,
}: TaskCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${_id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setShowDeleteModal(false);
      onDelete(_id);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          category,
          completed: true,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>

          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isCompleted
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {isCompleted ? "Completed" : "Pending"}
          </span>

          {!isCompleted && (
            <button
              onClick={handleComplete}
              title="Mark as completed"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-green-500 text-green-600 transition hover:bg-green-500 hover:text-white"
            >
              <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-gray-500">Due: {dueDate}</span>

        <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700">
          {category}
        </span>
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          to={`/edit-task/${_id}`}
          className="flex items-center gap-2 rounded-lg border border-purple-600 px-4 py-2 text-sm font-semibold text-purple-600 transition-colors duration-300 hover:bg-purple-600 hover:text-white"
        >
          <SquarePen className="h-4 w-4" />
          Edit
        </Link>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">
              Delete Task?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;

