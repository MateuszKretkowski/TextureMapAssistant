import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Items } from "./Components/items";
import { Main } from "./Components/Main/Main";
import { NavBar } from "./Components/NavBar/NavBar";
import { GetTextureBits } from "./Components/Functions/GetTextureBits";
import { ColorDuplicatePicker } from "./Components/Functions/ColorDuplicatePicker";
import { SimpleColorPaint } from "./Components/Functions/SimpleColorPaint";

function App() {


  return (
    <Router>
        <NavBar />
        <Routes>
          {/* Definiowanie tras */}
          <Route path="/" element={<Main />} />
          <Route path="/items" element={<Items />} />
          <Route path="/get-texture-bits" element={<GetTextureBits />} />
          <Route path="/color-duplicate-picker" element={<ColorDuplicatePicker />} />
          <Route path="/simple-color-paint" element={<SimpleColorPaint />} />
        </Routes>
    </Router>
  );
}

export default App;


