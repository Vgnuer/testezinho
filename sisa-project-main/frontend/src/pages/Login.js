import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

import '../styles/global.css';
import '../styles/login.css';

export default function Login() {
  localStorage.clear();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("occupation_id", res.data.user.occupation_id);
        navigate("/dashboard");
      } else {
        alert("Erro: Dados de login inválidos");
      }
    } catch (error) {
      const mensagemErro = error.response?.data?.error || "Erro desconhecido";
      console.error("Erro no login:", mensagemErro);
      
      switch(error.response?.status) {
        case 400:
          alert("Por favor, preencha todos os campos");
          break;
        case 401:
          alert("Usuário não encontrado");
          break;
        case 403:
          alert("Senha incorreta");
          break;
        default:
          alert(`Erro no login: ${mensagemErro}`);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Entrar no SISA</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="E-mail" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button className="login-button" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
