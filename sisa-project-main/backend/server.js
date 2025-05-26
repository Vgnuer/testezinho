const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const studentsRoutes = require("./routes/studentsRoute");
const subjectRoutes = require("./routes/subjectRoutes");
const documentRoutes = require("./routes/documentRoutes");
const http = require('http');
const https = require('https');
const fs = require('fs');

dotenv.config();
const app = express();

const PORT_HTTP = process.env.PORT || 5000;
const PORT_HTTPS = process.env.HTTPS_PORT || 5001;

if (process.env.NODE_ENV === 'production') {
  // Em produção, o HTTPS será gerenciado por um proxy reverso (como Nginx)
  app.listen(PORT_HTTP, () => {
    console.log(`Server running in production at http://localhost:${PORT_HTTP}`);
  });
} else {
  // Em desenvolvimento, usamos HTTPS local com certificados autoassinados
  const key = fs.readFileSync('./cert/key.pem');
  const cert = fs.readFileSync('./cert/cert.pem');

  https.createServer({ key, cert }, app).listen(PORT_HTTPS, () => {
    console.log(`Dev server running at https://localhost:${PORT_HTTPS}`);
  });
}

app.use(cors({
  origin: [
    'https://localhost:3000',
    'https://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://testezinho-sm9u.onrender.com',
    'https://testezinho-1.onrender.com' // Added this origin
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json({ limit: "10mb" }));

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
  res.send("SISA API is running.");
});

// Rota de teste
app.get("/api/test", (req, res) => {
  res.json({ message: "API está funcionando!" });
});

const PORT = process.env.PORT || 5000;

// Função para tentar iniciar o servidor em diferentes portas
function startServer(port) {
  if (port > 65535) {
    console.error(`Port ${port} exceeds the valid range (0–65535).`);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`API URL: http://localhost:${port}/api`);
    console.log(`Test URL: http://localhost:${port}/api/test`);
  }).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} in use, trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error("Error starting server:", err);
    }
  });
}

startServer(PORT_HTTP);
