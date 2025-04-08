// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ClientHome from './pages/ClientHome';
import ProfessionalHome from './pages/ProfessionalHome';
import CadastroCliente from './pages/CadastroCliente';
import CadastroProfissional from './pages/CadastroProfissional';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cliente" element={<ClientHome />} />
          <Route path="/profissional" element={<ProfessionalHome />} />
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          <Route path="/cadastro-profissional" element={<CadastroProfissional />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
