const { Sequelize } = require("sequelize");
require("dotenv").config();

// Debug: log das variáveis de ambiente usadas na conexão
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // adicione esta linha
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: true
    }
  }
);

sequelize.authenticate()
  .then(() => sequelize.sync({ alter: true }))
  .catch(err => {
    console.error('Erro ao conectar/sincronizar o banco de dados:', err);
  });

module.exports = sequelize;
