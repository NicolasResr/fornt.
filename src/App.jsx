import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Produtos from './pages/Produtos';
import Pedido from './pages/Pedido';
import Pagamento from './pages/Pagamento';  // ✅ Novo import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pagamento" element={<Pagamento />} /> {/* ✅ Nova rota */}
        <Route path="/pedido" element={<Pedido />} />
      </Routes>
    </Router>
  );
}

export default App;
