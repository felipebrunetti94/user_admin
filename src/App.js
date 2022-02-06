import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateUser from "./view/CreateUser";
import Dashboard from "./view/Dashboard";
import EditUser from "./view/EditUser";
import UserTable from "./view/UserTable";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<UserTable />} />
          <Route path="edit/:userId" element={<EditUser />} />
          <Route path="edit" element={<CreateUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
