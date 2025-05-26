const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbUrl = "mysql://root:hhFqazJCMYAIkiqxEhkfIpFDgpQUMXYd@interchange.proxy.rlwy.net:14848/railway";

// Debug: log das variáveis de ambiente usadas na conexão
console.log('DB_URL:', dbUrl);

const sequelize = new Sequelize(dbUrl, {
  dialect: "mysql",
  logging: false,
  
  // Configurações de pool para melhor gerenciamento de conexões
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  
  // Configurações de timeout
  dialectOptions: {
    // Remove invalid options
    connectTimeout: 60000,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  
  define: {
    timestamps: true
  },
  
  // Retry automático
  retry: {
    max: 3
  }
});

// Debug: log das configurações de conexão
console.log('Tentando conectar ao banco com as seguintes configurações:');
console.log('Host:', sequelize.options.host);
console.log('Database:', sequelize.options.database);
console.log('Username:', sequelize.options.username);
console.log('Dialect:', sequelize.options.dialect);

// Função para testar a conexão com retry
async function connectWithRetry(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Tentativa ${i + 1} de conexão com o banco...`);
      await sequelize.authenticate();
      console.log('✅ Conexão com banco de dados estabelecida com sucesso!');
      
      // NÃO sincronizar automaticamente - o schema já existe
      // await sequelize.sync({ alter: true });
      console.log('✅ Usando schema existente do banco!');
      return;
      
    } catch (error) {
      console.error(`❌ Erro na tentativa ${i + 1}:`, error.message);
      console.error('Detalhes do erro:', error);
      
      if (i === retries - 1) {
        console.error('🚨 Todas as tentativas de conexão falharam!');
        console.error('Verifique:');
        console.error('1. Se as variáveis de ambiente estão corretas');
        console.error('2. Se o banco de dados está acessível');
        console.error('3. Se as credenciais estão válidas');
        console.error('4. Se o firewall permite a conexão');
        throw error;
      }
      
      // Aguardar antes da próxima tentativa
      const delay = Math.pow(2, i) * 1000; // Exponential backoff
      console.log(`⏳ Aguardando ${delay}ms antes da próxima tentativa...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Iniciar conexão
connectWithRetry().catch(err => {
  console.error('💥 Falha crítica na conexão:', err);
  process.exit(1);
});

module.exports = sequelize;