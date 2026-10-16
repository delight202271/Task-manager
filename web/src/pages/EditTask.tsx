import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  completed: boolean;
};

const EditTask = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  // Fetch the task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/tasks/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load task");
        }

        setTask(data.task);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    } else {
      setError("Task ID is missing");
      setLoading(false);
    }
  }, [id]);

  // Populate the form
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate?.slice(0, 10) || "");
      setCategory(task.category);
    }
  }, [task]);

  // Update task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !title.trim() ||
      !description.trim() ||
      !dueDate ||
      !category
    ) {
      setError("Please complete all fields.");
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      dueDate,
      category,
      completed: task?.completed ?? false,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update task");
        return;
      }

      navigate("/all-tasks");
    } catch (error) {
      console.error("Error updating task:", error);

      setError("Unable to connect to the server. Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <main className="min-h-[80vh] bg-[#FAF8FB] px-4 py-8">
        <p className="text-center text-gray-500">Loading task...</p>
      </main>
    );
  }

  // Error state when task cannot be loaded
  if (error && !task) {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#FAF8FB] px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {/* Error Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <span className="text-2xl text-red-500">!</span>
        </div>

        {/* Error Message */}
        <h2 className="text-xl font-semibold text-[#292929]">
          Unable to Load Task
        </h2>

        <p className="mt-3 text-sm text-red-500">
          {error}
        </p>

        {/* Back to All Tasks */}
        <Link
          to="/all-tasks"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700"
        >
          <ChevronLeft size={18} />
          Back to All Tasks
        </Link>
      </div>
    </main>
  );
}

  if (!task) {
    return null;
  }

  return (
    <main className="min-h-[80vh] bg-[#FAF8FB] px-4 py-6 sm:py-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Heading with back arrow */}
        <div className="mb-6 flex items-center gap-1">
          <Link
            to="/all-tasks"
            aria-label="Back to all tasks"
            title="Back to all tasks"
            className="inline-flex items-center justify-center text-[#292929] transition-colors hover:text-purple-600"
          >
            <ChevronLeft size={26} strokeWidth={2} />
          </Link>

          <h1 className="text-2xl font-semibold text-[#292929]">
            Edit Task
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Task Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="mt-2 w-full rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Describe your task..."
              className="mt-2 w-full resize-y rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-purple-500"
            />
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-600"
            >
              Due Date
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-purple-500"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-purple-500"
            >
              <option value="">Select category</option>
              <option value="school">School</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-[#9850D0] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Done
          </button>

          {/* Back to All Tasks */}
          <div className="flex justify-center pt-1">
            <Link
              to="/all-tasks"
              className="text-xs text-purple-600 transition-colors hover:text-purple-800"
            >
              Back to My Tasks
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditTask;