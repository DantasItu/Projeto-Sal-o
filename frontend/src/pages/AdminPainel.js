// src/pages/AdminPainel.js
import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function AdminPainel() {
  const [profissionais, setProfissionais] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      return navigate('/');
    }

    buscarProfissionais();
  }, []);

  const buscarProfissionais = async () => {
    try {
      const response = await api.get('/usuarios/profissionais', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfissionais(response.data);
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
    }
  };

  const cadastrarProfissional = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', {
        name: nome,
        email,
        password: senha,
        role: 'profissional',
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Profissional cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
      buscarProfissionais();
    } catch (err) {
      alert('Erro ao cadastrar profissional.');
    }
  };

  const removerProfissional = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este profissional?')) return;
    try {
      await api.delete(`/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      buscarProfissionais();
    } catch (err) {
      alert('Erro ao remover profissional.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Painel Administrativo - Profissionais</h2>

      <form onSubmit={cadastrarProfissional} className="mt-4 mb-4">
        <h5>Adicionar Novo Profissional</h5>
        <div className="row g-2">
          <div className="col-md">
            <input className="form-control" placeholder="Nome"
              value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="col-md">
            <input className="form-control" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="col-md">
            <input className="form-control" type="password" placeholder="Senha"
              value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <div className="col-md-auto">
            <button className="btn btn-success">Cadastrar</button>
          </div>
        </div>
      </form>

      <h5>Profissionais Cadastrados</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {profissionais.map((prof) => (
            <tr key={prof._id}>
              <td>{prof.name}</td>
              <td>{prof.email}</td>
              <td>
                <button className="btn btn-danger btn-sm"
                  onClick={() => removerProfissional(prof._id)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
