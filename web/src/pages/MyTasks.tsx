import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, X, ArrowUp } from "lucide-react";

type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  completed: boolean;
};

const MyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");

        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        const data = await response.json();

        setTasks(data.tasks);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task._id !== id),
    );
  };

  // Filter tasks using the search input.
  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.trim().toLowerCase();

    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.category.toLowerCase().includes(query)
    );
  });

  // Scroll smoothly to the top of the page.
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-[80vh] py-10">
      <div className="container mx-auto w-11/12">
        {/* Page heading */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Tasks
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your tasks and keep track of what needs to be done.
            </p>
          </div>

          <Link
            to="/new-task"
            className="w-fit rounded-lg bg-white px-5 py-3 font-semibold text-purple-500 transition-all duration-300 hover:text-purple-700"
          >
            + Add New Task
          </Link>
        </div>

        {/* Search input */}
        <div className="mt-8 lg:px-10">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search your tasks..."
              aria-label="Search tasks"
              className="w-full rounded-3xl border border-gray-200 bg-white py-3 pl-12 pr-12 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-purple-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {!loading && !error && searchQuery.trim() !== "" && (
            <p className="mt-3 text-sm text-gray-500">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"} found
            </p>
          )}
        </div>

        {/* Task list */}
        <div className="mt-8">
          <div className="grid gap-5 md:grid-cols-2 lg:px-10">
            {loading ? (
              <div className="col-span-full flex justify-center py-10">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600"></div>
              </div>
            ) : error ? (
              <p className="col-span-full text-center text-red-500">
                {error}
              </p>
            ) : filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  _id={task._id}
                  title={task.title}
                  description={task.description}
                  dueDate={task.dueDate}
                  category={task.category}
                  completed={task.completed}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <Search className="mx-auto h-10 w-10 text-gray-300" />

                <h2 className="mt-4 text-lg font-semibold text-gray-800">
                  {searchQuery.trim()
                    ? "No matching tasks found"
                    : "No tasks yet"}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {searchQuery.trim()
                    ? "Try another keyword or clear your search."
                    : "Create your first task to get started."}
                </p>

                {searchQuery.trim() && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-4 rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-700"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={handleBackToTop}
        aria-label="Back to top"
        title="Back to top"
        className="fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:bottom-8 sm:right-8"
      >
        <ArrowUp size={22} strokeWidth={2.5} />
      </button>
    </main>
  );
};

export default MyTasks;