// App.tsx (ou App.js, caso não esteja usando TypeScript)

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashbord'; // Vamos criar este componente a seguir
import { Register } from './pages/Register';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
};

