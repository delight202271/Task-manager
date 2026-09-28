import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTask(data.task);
      });
  }, [id]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setCategory(task.category);
    }
  }, [task]);
  if (!task) {
    return <p>Loading task...</p>;
  }

  console.log(task);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
      category,
      completed: task.completed,
    };

    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();

    console.log(data);
    if (response.ok) {
  navigate("/all-tasks");
}
  };
  return (
    <main className="min-h-[80vh] py-10">
      <div className="mx-auto w-11/12 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">Edit Task</h1>

        <p className="mt-2 text-gray-500">Edit your task details here.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition-colors duration-300 hover:bg-purple-700"
          >
            Update Task
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditTask;