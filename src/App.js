import React from "react";
import './App.css';

import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { TaskForm } from "./Components/Forms/TaskForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="add-task" element={<TaskForm />} />
    </Routes>
  );
}

export default App;
