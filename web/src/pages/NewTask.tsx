
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const NewTask = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Stores validation error messages
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
    general: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({
      title: "",
      description: "",
      dueDate: "",
      category: "",
      general: "",
    });

    const newErrors = {
      title: "",
      description: "",
      dueDate: "",
      category: "",
      general: "",
    };

    // Client-side validation
    if (!title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    if (!category) {
      newErrors.category = "Please select a category";
    }

    // If there are validation errors, show them and stop
    if (
      newErrors.title ||
      newErrors.description ||
      newErrors.dueDate ||
      newErrors.category
    ) {
      setErrors(newErrors);
      return;
    }

    const taskData = {
      title,
      description,
      dueDate,
      category,
      completed: false,
    };

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      // Backend validation error
      if (!response.ok) {
        setErrors((previous) => ({
          ...previous,
          general: data.message || "Failed to create task",
        }));

        return;
      }

      // Task created successfully
      navigate("/all-tasks");
    } catch (error) {
      console.error("Error creating task:", error);

      setErrors((previous) => ({
        ...previous,
        general: "Unable to connect to the server. Please try again.",
      }));
    }
  };

  return (
    <main className="min-h-[80vh] bg-gray-50 py-10">
      <div className="mx-auto w-11/12 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Task
          </h1>

          <p className="mt-2 text-gray-500">
            Add a new task and keep track of what needs to be done.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* General Error */}
            {errors.general && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Task Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Complete React assignment"
                className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.title
                    ? "border-red-500"
                    : "border-gray-300 focus:border-gray-900"
                }`}
              />

              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe what needs to be done..."
                className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.description
                    ? "border-red-500"
                    : "border-gray-300 focus:border-gray-900"
                }`}
              />

              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div className="mt-6">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>

              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.dueDate
                    ? "border-red-500"
                    : "border-gray-300 focus:border-gray-900"
                }`}
              />

              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
              )}
            </div>

            {/* Category */}
            <div className="mt-6">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 outline-none ${
                  errors.category
                    ? "border-red-500"
                    : "border-gray-300 focus:border-gray-900"
                }`}
              >
                <option value="">Select category</option>
                <option value="school">School</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
              </select>

              {errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full rounded-lg bg-purple-600 px-4 py-3 font-medium text-white transition hover:bg-purple-800"
              >
                Create Task
              </button>
            </div>

            {/* Back */}
            <div className="flex justify-center">
              <Link
                to="/all-tasks"
                className="mb-6 inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:text-purple-800"
              >
                ← Back to My Tasks
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default NewTask;

