import { useState, useEffect } from 'react';
import { cadastrar } from '../api/authApi';
import './style.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('cadastro');
    return () => {
      document.body.classList.remove('cadastro');
    };
  }, []);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    else if (/@/.test(formData.nome)) newErrors.nome = 'Caractéres inválidos em nome';
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
    else if (formData.senha.length < 6) newErrors.senha = 'Senha deve ter ao menos 6 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    cadastrar(formData); // Chamada API (pode ser await)
    alert('Cadastro enviado!');

    setFormData({ nome: '', email: '', senha: '' });
    setErrors({});

    navigate('/login');
  };

  return (
    <div className="cadastro">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo RecLivros" />
        </div>
        <h1 style={{ textAlign: 'left' }}>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          {errors.nome && <p className="error">{errors.nome}</p>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          {errors.senha && <p className="error">{errors.senha}</p>}

          <button type="submit" className="cadastro-button">Cadastrar</button>
        </form>
        <div className="login-link">
          Já tem conta? <a href="/login">Faça login</a>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
