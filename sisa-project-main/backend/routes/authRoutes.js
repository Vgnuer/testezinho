const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET não configurado");
      return res.status(500).json({ error: "Erro de configuração do servidor" });
    }

    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: "Email não cadastrado" });
    }

    const valid = await bcrypt.compare(password, user.password);
    
    if (!valid) {
      return res.status(403).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id, occupation_id: user.occupation_id }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(`Login bem sucedido para: ${email}`);
    res.json({ 
      token, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        occupation_id: user.occupation_id
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ 
      error: "Erro interno do servidor",
      details: error.message 
    });
  }
});

module.exports = router;
