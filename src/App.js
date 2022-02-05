import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/edit/:id" element={<></>} />
        <Route path="/add" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
