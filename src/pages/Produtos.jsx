// src/pages/Produtos.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/produto")
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {produtos.map(prod => (
          <div key={prod.id} className="border rounded-xl shadow p-4 bg-white">
            <img src={prod.imgUrl} alt={prod.nome} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{prod.nome}</h2>
            <p className="text-gray-600 text-sm">{prod.descricao}</p>
            <p className="text-green-600 font-bold mt-2">R$ {prod.preco?.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
