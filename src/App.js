import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateUser from "./view/user/CreateUser";
import Dashboard from "./view/user/Dashboard";
import EditUser from "./view/user/EditUser";
import UserTable from "./view/user/UserTable";

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
