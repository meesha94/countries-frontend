import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './Game/game';
import Exit from './Components/exit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/exit" element={<Exit />} />
      </Routes>
    </Router>
  );
};

export default App;