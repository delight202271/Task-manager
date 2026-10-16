import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Cover from "./pages/Cover";
import MyTask from "./pages/MyTasks";
import Footer from "./components/Footer";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/all-tasks" element={<MyTask />} />
        <Route path="/new-task" element={<NewTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;