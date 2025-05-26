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
        alert("Erro: Resposta inválida do servidor");
      }
    } catch (error) {
      console.error("Erro detalhado:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      alert(error.response?.data?.error || "Erro ao fazer login: Verifique suas credenciais");
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
