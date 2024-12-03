import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Items } from "./Components/items";
import { Main } from "./Components/Main/Main";
import { NavBar } from "./Components/NavBar/NavBar";
import { GetTextureBits } from "./Components/Functions/GetTextureBits";

function App() {


  return (
    <Router>
        <NavBar />
        <Routes>
          {/* Definiowanie tras */}
          <Route path="/" element={<Main />} />
          <Route path="/items" element={<Items />} />
          <Route path="/get-texture-bits" element={<GetTextureBits />} />
        </Routes>
    </Router>
  );
}

export default App;


