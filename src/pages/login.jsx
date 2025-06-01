import { useState, useEffect } from 'react';
import { cadastrar, login } from '../api/authApi';
import './style.css';
import logo from '../assets/logo.png';
import { redirect, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
      document.body.classList.add('cadastro');
      return () => {
        document.body.classList.remove('cadastro');
      };
    }, []);

  const [formData, setFormData] = useState({
    usuario: '',  // aqui entra nome ou email
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
    if (!formData.usuario) {
      newErrors.usuario = 'Nome ou email são obrigatórios';
    } else {
      // Se tem @ é email
      if (formData.usuario.includes('@')) {
        // validar email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(formData.usuario)) {
          newErrors.usuario = 'Email inválido';
        }
      } else {
        // validar nome
        // só aceitar letras e espaços por exemplo
        if (!/^[a-zA-Z\s]+$/.test(formData.usuario)) {
          newErrors.usuario = 'Caractéres inválidos no nome';
        }
      }
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter ao menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
        // Prepara dados para enviar
        const dadosEnvio = {
            senha: formData.senha,
        };

        if (formData.usuario.includes('@')) {
            dadosEnvio.email = formData.usuario;
        } else {
            dadosEnvio.nome = formData.usuario;
        }

        // Faz o login
        const dados = await login(dadosEnvio);
        console.log("Usuário logado.");

        // Salva token e usuário no localStorage
        localStorage.setItem('token', dados.token);
        localStorage.setItem('usuario', JSON.stringify(dados.usuario));

        // Navega para dashboard
        navigate('/');

    } catch (erroBackend) {
        console.error('Erro: ', erroBackend);
        setErrors({ geral: 'Falha ao logar. Tente novamente.' });
    }
  };

  return (
    <div className="cadastro container">
      <div className="logo">
        <img src={logo} alt="Logo RecLivros" />
      </div>
      <h1 style={{ textAlign: 'left' }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="usuario">Nome ou Email</label>
        <input 
          type="text" 
          id="usuario" 
          name="usuario" 
          value={formData.usuario} 
          onChange={handleChange} 
          required 
        />
        {errors.usuario && <span className="error">{errors.usuario}</span>}

        <label htmlFor="senha">Senha</label>
        <input 
          type="password" 
          id="senha" 
          name="senha" 
          value={formData.senha} 
          onChange={handleChange} 
          required 
        />
        {errors.senha && <span className="error">{errors.senha}</span>}

        {errors.geral && <div className="error">{errors.geral}</div>}

        <button type="submit" className="cadastro-button">Entrar</button>
      </form>
      <div className="login-link">
        Ainda não tem conta? <a href="/cadastro">Cadastre-se</a>
      </div>
    </div>
  );
}

export default Login;
