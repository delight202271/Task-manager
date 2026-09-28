import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        return response.json();
      })
      .then((data) => {
        setTasks(data.tasks);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  const handleDelete = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task._id !== id));
  };

  return (
    <main className="min-h-[80vh]  py-10" id="#">
      <div className="w-11/12 container mx-auto">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>

            <p className="mt-2 text-gray-500">
              Manage your tasks and keep track of what needs to be done.
            </p>
          </div>

          <Link
            to="/new-tasks"
            className="w-fit rounded-lg bg-white px-5 py-3 font-semibold text-purple-500 transition-all duration-300 hover:text-purple-700"
          >
            + Add New Task
          </Link>
        </div>

        {/* Tasks will go here */}
        <div className="mt-10">
          <div className="grid gap-5 md:grid-cols-2 lg:px-10">
            {loading ? (
              <div className="col-span-full flex justify-center py-10">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600"></div>
              </div>
            ) : error ? (
              <p className="col-span-full text-center text-red-500">{error}</p>
            ) : (
              tasks.map((task) => (
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
            )}
             <button>
            <Link to="#My tasks">


             Back to top
            </Link>
          </button>
          </div>
          
        </div>
      </div>
    </main>
  );
};

export default MyTasks;