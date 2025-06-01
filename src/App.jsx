// App.jsx
import { Routes, Route } from 'react-router-dom';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import Home from './pages/home';
import Livro from './pages/livro';
import Buscar from './pages/buscar';
import Historico from './pages/historico';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/livro/:id" element={<Livro />} />
      <Route path="/buscar" element={<Buscar />} />
      <Route path="/usuario/historico/:id" element={<Historico />} />
    </Routes>
  );
}

export default App
