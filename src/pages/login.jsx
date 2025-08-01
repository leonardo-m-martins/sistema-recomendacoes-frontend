import { useState, useEffect } from 'react';
import { cadastrar, guestLogin, login } from '../api/authApi';
// import './style.css';
import logo from '../assets/logo.png';
import bookshelf from '../assets/bookshelf.jpg'
import { redirect, useNavigate } from 'react-router-dom';
import { BackgroundBookshelf } from '../components/BackgroundBookshelf';
import { LoginBox } from '../components/LoginBox';
import { InputField } from '../components/InputField';
import { BigBrownButton } from '../components/BigBrownButton';
import { BrownLink } from '../components/BrownLink';

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

  const loginAsGuest = async (e) => {
    e.preventDefault();

    const dados = await guestLogin();
    console.log("Convidado logado.");

    localStorage.setItem('token', dados.token);
    localStorage.setItem('usuario', JSON.stringify(dados.usuario));

    navigate('/');
  }

  return (
    <BackgroundBookshelf>
      <LoginBox>
        <img src={logo} alt="Logo RecLivros" />
        <h1 className="text-2xl text-left pb-4 font-bold">Login</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Nome ou Email"
            id="usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            error={errors.usuario}
            required
          />

          <InputField
            label="Senha"
            id="senha"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            error={errors.senha}
            required
          />

          {errors.geral && <div className="error">{errors.geral}</div>}

          <br className="my-2" />

          <BigBrownButton label="Entrar" type="submit" />
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-600" />
          <span className="mx-4 text-gray-800">OU</span>
          <hr className="flex-grow border-t border-gray-600" />
        </div>
        <BigBrownButton label="Entrar como convidado" onClick={loginAsGuest} />
        <br />
        <div className="text-center">
          Ainda não tem conta? <BrownLink to="/cadastro" title="cadastro">Cadastre-se</BrownLink>
        </div>
      </LoginBox>
    </BackgroundBookshelf>
  );
}

export default Login;
