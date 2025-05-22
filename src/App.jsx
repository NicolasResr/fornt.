import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage'; // Ajustei para a página correta
import Produtos from './pages/Produtos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} /> {/* Atualizado para AuthPage */}
        <Route path="/produtos" element={<Produtos />} />
      </Routes>
    </Router>
  );
}

export default App;
