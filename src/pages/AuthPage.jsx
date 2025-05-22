import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario, loginUsuario } from '../services/Usuario';
import '../styles/AuthPage.css'; // Importa o CSS puro

export default function AuthPage() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '' });
  const [isLogin, setIsLogin] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await loginUsuario({ email: form.email, senha: form.senha });
        setMensagem(res.data);
        navigate('/produtos');
      } else {
        const res = await cadastrarUsuario(form);
        setMensagem(`Usuário ${res.data.nome} cadastrado com sucesso!`);
      }
    } catch (error) {
      setMensagem(error.response?.data || 'Erro inesperado');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? 'Login de Usuário' : 'Cadastro de Usuário'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="telefone"
                placeholder="Telefone"
                value={form.telefone}
                onChange={handleChange}
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
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Cadastre-se' : 'Faça login'}
          </button>
        </p>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
}
