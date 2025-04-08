// src/pages/CadastroCliente.js
import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CadastroCliente() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
        role: 'cliente'
      });
      alert('Cadastro realizado com sucesso!');
      navigate('/');
    } catch (err) {
      setError('Erro ao cadastrar. Verifique os dados.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Cadastro de Cliente</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nome:</label>
          <input type="text" className="form-control" value={name}
            onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Senha:</label>
          <input type="password" className="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary w-100">Cadastrar</button>
      </form>
    </div>
  );
}
