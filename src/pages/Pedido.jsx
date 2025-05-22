import { useState } from 'react';
import axios from 'axios';

function Pedido() {
  const [pedidoId, setPedidoId] = useState('');
  const [pedido, setPedido] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleBuscarPedido = async (e) => {
    e.preventDefault();

    if (!pedidoId) {
      setMensagem('Por favor, informe o ID do Pedido.');
      return;
    }

    setCarregando(true);
    setMensagem('');
    setPedido(null);

    try {
      const response = await axios.get(`http://localhost:8080/pedido/${pedidoId}`);
      setPedido(response.data);
    } catch (error) {
      console.error(error);
      setMensagem('Pedido não encontrado ou erro na consulta.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔎 Consultar Pedido</h1>

      <form onSubmit={handleBuscarPedido} style={styles.form}>
        <input
          type="number"
          placeholder="Informe o ID do Pedido"
          value={pedidoId}
          onChange={(e) => setPedidoId(e.target.value)}
          style={styles.input}
        />
        <button type="submit" disabled={carregando} style={styles.button}>
          {carregando ? 'Buscando...' : 'Buscar Pedido'}
        </button>
      </form>

      {mensagem && <p style={styles.message}>{mensagem}</p>}

      {pedido && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📦 Dados do Pedido</h3>
          <p><strong>ID:</strong> {pedido.id}</p>
          <p><strong>Momento:</strong> {new Date(pedido.momento).toLocaleString()}</p>
          <p><strong>Status:</strong> {pedido.status}</p>

          {pedido.cliente && (
            <p><strong>Cliente:</strong> {pedido.cliente.nome}</p>
          )}

          {pedido.pagamento && (
            <>
              <h4>💰 Pagamento</h4>
              <p><strong>ID:</strong> {pedido.pagamento.id}</p>
              <p><strong>Momento:</strong> {new Date(pedido.pagamento.momento).toLocaleString()}</p>
            </>
          )}

          {pedido.produto && pedido.produto.length > 0 && (
            <>
              <h4>🛒 Produtos</h4>
              <ul>
                {pedido.produto.map((prod, index) => (
                  <li key={index}>{prod.nome}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif'
  },
  title: {
    marginBottom: '1.5rem',
    color: '#343a40',
    fontSize: '2rem',
    fontFamily: 'Poppins, sans-serif'
  },
  form: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ced4da',
    minWidth: '250px',
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif'
  },
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Poppins, sans-serif'
  },
  message: {
    color: '#dc3545',
    marginTop: '0.5rem',
    fontFamily: 'Poppins, sans-serif'
  },
  card: {
    marginTop: '1.5rem',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'left',
    minWidth: '300px',
    fontFamily: 'Poppins, sans-serif'
  },
  cardTitle: {
    marginBottom: '1rem',
    color: '#343a40',
    fontFamily: 'Poppins, sans-serif'
  },
};

export default Pedido;
