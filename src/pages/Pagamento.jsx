import { useState } from 'react';
import axios from 'axios';

function Pagamento() {
  const [pedidoId, setPedidoId] = useState('');
  const [pagamento, setPagamento] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleBuscarPagamento = async (e) => {
    e.preventDefault();

    if (!pedidoId) {
      setMensagem('Por favor, informe o ID do Pedido.');
      return;
    }

    setCarregando(true);
    setMensagem('');
    setPagamento(null);

    try {
      const response = await axios.get(`https://seu-backend.com/pagamentos/${pedidoId}`);
      setPagamento(response.data);
    } catch (error) {
      console.error(error);
      setMensagem('Pagamento não encontrado ou erro na consulta.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Consultar Pagamento</h1>

      <form onSubmit={handleBuscarPagamento} style={styles.form}>
        <input
          type="number"
          placeholder="Informe o ID do Pedido"
          value={pedidoId}
          onChange={(e) => setPedidoId(e.target.value)}
          style={styles.input}
        />
        <button type="submit" disabled={carregando} style={styles.button}>
          {carregando ? 'Buscando...' : 'Buscar Pagamento'}
        </button>
      </form>

      {mensagem && <p>{mensagem}</p>}

      {pagamento && (
        <div style={styles.result}>
          <h3>Dados do Pagamento:</h3>
          <p><strong>ID:</strong> {pagamento.id}</p>
          <p><strong>Momento:</strong> {new Date(pagamento.momento).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  form: {
    marginTop: '1rem',
  },
  input: {
    padding: '0.5rem',
    marginRight: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
  },
  result: {
    marginTop: '1.5rem',
    textAlign: 'left',
    display: 'inline-block',
  },
};

export default Pagamento;
