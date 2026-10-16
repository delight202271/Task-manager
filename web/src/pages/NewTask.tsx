import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

const NewTask = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
    general: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    // Stop submission if validation fails
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
      title: title.trim(),
      description: description.trim(),
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

      if (!response.ok) {
        setErrors((previous) => ({
          ...previous,
          general: data.message || "Failed to create task",
        }));

        return;
      }

      // Navigate to All Tasks after successful creation
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
    <main className="min-h-[80vh] bg-gray-50 py-6 sm:py-8">
      <div className="mx-auto w-11/12 max-w-2xl">
        {/* Heading with back arrow */}
        <div className="mb-6">
          <div className="flex items-center gap-1">
            <Link
              to="/all-tasks"
              aria-label="Back to all tasks"
              title="Back to all tasks"
              className="inline-flex items-center justify-center text-[#292929] transition-colors hover:text-purple-600"
            >
              <ChevronLeft size={26} strokeWidth={2} />
            </Link>

            <h1 className="text-2xl font-semibold text-[#292929]">
             Create New Task
            </h1>
          </div>
        </div>

        {/* Form container */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <form onSubmit={handleSubmit}>
            {/* General Error */}
            {errors.general && (
              <div
                role="alert"
                className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {errors.general}
              </div>
            )}

            {/* Task Title */}
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
                className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none transition-colors ${
                  errors.title
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-purple-600"
                }`}
              />

              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mt-5">
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
                rows={4}
                placeholder="Describe what needs to be done..."
                className={`mt-2 w-full resize-y rounded-lg border px-4 py-3 outline-none transition-colors ${
                  errors.description
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-purple-600"
                }`}
              />

              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div className="mt-5">
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
                className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 outline-none transition-colors ${
                  errors.dueDate
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-purple-600"
                }`}
              />

              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.dueDate}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="mt-5">
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
                className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 outline-none transition-colors ${
                  errors.category
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-purple-600"
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

            {/* Submit Button */}
            <div className="mt-7">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-purple-600 px-4 py-3 font-medium text-white transition-colors hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Create Task
              </button>
            </div>

            {/* Back to All Tasks */}
            <div className="mt-5 flex justify-center">
              <Link
                to="/all-tasks"
                className="inline-flex items-center gap-1 text-sm text-purple-600 transition-colors hover:text-purple-800"
              >
                <ChevronLeft size={16} />
                Back to My Tasks
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default NewTask;