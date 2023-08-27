import React from "react";
import './App.css';

import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { TaskForm } from "./Components/Forms/TaskForm";
import { SignUp } from "./Components/Login/SignUp";
import { Login } from "./Components/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="add-task" element={<TaskForm />} />
      <Route path="add-task/:documentId" element={<TaskForm />} />
    </Routes>
  );
}

export default App;
