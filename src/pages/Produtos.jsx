import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";  // ✅ Ícone
import axios from "axios";
import '../styles/Produto.css'; // Importa o CSS

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/produto")
      .then(response => setProdutos(response.data))
      .catch(error => console.error("Erro ao buscar produtos:", error));
  }, []);

  const formatarPreco = (valor) => {
    if (!valor) return "Rp 0";
    return "Rp " + valor.toLocaleString("id-ID");
  };

  const irParaPedido = () => {
    navigate('/pedido');
  };

  return (
    <div className="produtos-container">
      {/* Botão para Pedido */}
      <button className="pedido-button" onClick={irParaPedido}>
        <FaClipboardList size={20} style={{ marginRight: '8px' }} />
      </button>

      {/* Banner */}
      <div className="banner">
        <div className="banner-overlay">
          <h1 className="banner-title">Shop</h1>
          <p className="breadcrumb">Home &gt; Shop</p>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="produtos-grid">
        {produtos.map(prod => (
          <div key={prod.id} className="produto-card">
            <img src={prod.imgUrl} alt={prod.nome} className="produto-img" />
            <div className="produto-info">
              <h2 className="produto-nome">{prod.nome}</h2>
              <p className="produto-preco">{formatarPreco(prod.preco)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
