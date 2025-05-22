import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario, loginUsuario } from '../services/Usuario';

export default function AuthPage() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '' });
  const [isLogin, setIsLogin] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate(); // Para redirecionamento

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await loginUsuario({ email: form.email, senha: form.senha });
        setMensagem(res.data);
        navigate('/produtos'); // Redireciona após login
      } else {
        const res = await cadastrarUsuario(form);
        setMensagem(`Usuário ${res.data.nome} cadastrado com sucesso!`);
      }
    } catch (error) {
      setMensagem(error.response?.data || 'Erro inesperado');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? 'Login de Usuário' : 'Cadastro de Usuário'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-800"
        >
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
        <button className="underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Cadastre-se' : 'Faça login'}
        </button>
      </p>

      {mensagem && <p className="mt-4 text-center text-red-500">{mensagem}</p>}
    </div>
  );
}
